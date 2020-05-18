package com.makeit.api.controller;

import com.makeit.api.exception.InvalidTokenRequestException;
import com.makeit.api.exception.PasswordResetException;
import com.makeit.api.exception.PasswordResetLinkException;
import com.makeit.api.exception.TokenRefreshException;
import com.makeit.api.exception.UserLoginException;
import com.makeit.api.exception.UserRegistrationException;
import com.makeit.api.model.ApiResponse;
import com.makeit.api.model.JwtAuthenticationDto;
import com.makeit.api.model.LoginDto;
import com.makeit.api.model.PasswordResetDto;
import com.makeit.api.model.PasswordResetLinkDto;
import com.makeit.api.model.RegistrationDto;
import com.makeit.api.model.TokenRefreshDto;
import com.makeit.api.service.AuthenticationService;
import com.makeit.app.event.GenerateResetLinkEvent;
import com.makeit.app.event.RegenerateEmailVerificationEvent;
import com.makeit.app.event.UserAccountChangeEvent;
import com.makeit.app.event.UserRegistrationCompleteEvent;
import com.makeit.dao.model.RefreshToken;
import com.makeit.security.JwtTokenProvider;
import com.makeit.security.JwtUserDetails;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.Optional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Api(
    value = "Authorization Rest API",
    description = "Defines endpoints that can be hit only when the user is not logged in. It's not secured by default."
)
@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final ApplicationEventPublisher eventPublisher;
    private final JwtTokenProvider tokenProvider;

    /**
     * Checks is a given email is in use or not.
     */
    @ApiOperation(
        value = "Checks if the given email is in use",
        response = ApiResponse.class
    )
    @GetMapping("/check-email")
    public ResponseEntity<ApiResponse<Boolean>> checkEmailInUse(
        @ApiParam(value = "Email id to check against") @RequestParam("email") String email
    ) {
        return ResponseEntity.ok(ApiResponse.<Boolean>data()
            .data(authenticationService.emailAlreadyExists(email))
            .build()
        );
    }

    /**
     * Checks is a given username is in use or not.
     */
    @ApiOperation(
        value = "Checks if the given username is in use",
        response = ApiResponse.class
    )
    @GetMapping("/check-username")
    public ResponseEntity<ApiResponse<Boolean>> checkUsernameInUse(
        @ApiParam(value = "Username to check against") @RequestParam("username") String username
    ) {
        return ResponseEntity.ok(ApiResponse.<Boolean>data()
            .data(authenticationService.usernameAlreadyExists(username))
            .build()
        );
    }

    /**
     * Entry point for the user log in. Return the jwt auth token and the refresh token
     */
    @PostMapping("/login")
    @ApiOperation(
        value = "Logs the user in to the system and return the auth tokens"

    )
    public ResponseEntity<JwtAuthenticationDto> authenticateUser(
        @ApiParam(value = "The LoginRequest payload") @Valid @RequestBody LoginDto request
    ) {
        var authentication = authenticationService.authenticateUser(request).orElseThrow(
            () -> new UserLoginException(String.format("Couldn't login user [%s]", request))
        );

        var userDetails = (JwtUserDetails) authentication.getPrincipal();
        var accessToken = authenticationService.generateToken(userDetails);
        LOGGER.info("Logged in User returned [API]: " + userDetails.getUsername());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        var response = authenticationService.createAndPersistRefreshTokenForDevice(authentication, request)
            .map(RefreshToken::getToken)
            .map(refreshToken -> JwtAuthenticationDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiryDuration(tokenProvider.getExpiryDuration())
                .build());

        return response.map(ResponseEntity::ok).orElseThrow(() -> {
            var message = String.format("Couldn't create refresh token for: [%s]", request);
            return new UserLoginException(message);
        });
    }

    /**
     * Entry point for the user registration process. On successful registration,
     * publish an event to generate email verification token
     */
    @PostMapping("/register")
    @ApiOperation(
        value = "Registers the user and publishes an event to generate the email verification"
    )
    public ResponseEntity<ApiResponse<String>> registerUser(
        @ApiParam(value = "The RegistrationRequest payload") @Valid @RequestBody RegistrationDto request
    ) {

        var urlBuilder = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/auth/registrationConfirmation");

        var response = authenticationService.registerUser(request).map(user -> {
            eventPublisher.publishEvent(UserRegistrationCompleteEvent.builder()
                .user(user)
                .redirectUrl(urlBuilder)
                .build()
            );

            LOGGER.info(String.format("Registered User [%s]", user));

            return ApiResponse.<String>data()
                .data("User registered successfully. Check your email for verification")
                .build();
        });

        return response.map(ResponseEntity::ok).orElseThrow(() -> new UserRegistrationException(
            request.getEmail(),
            "Missing user object in database"
        ));
    }

    /**
     * Receives the reset link request and publishes an event to send email id containing
     * the reset link if the request is valid. In future the deeplink should open within
     * the app itself.
     */
    @PostMapping("/password/reset-link")
    @ApiOperation(
        value = "Receive the reset link request and publish event to send mail containing the password reset link"
    )
    public ResponseEntity<ApiResponse<String>> resetLink(
        @ApiParam(value = "The PasswordResetLinkRequest payload") @Valid @RequestBody PasswordResetLinkDto request
    ) {
        var urlBuilder = ServletUriComponentsBuilder.fromCurrentContextPath().path("/password/reset-link");

        var response = authenticationService.generatePasswordResetToken(request).map(passwordResetToken -> {
            eventPublisher.publishEvent(GenerateResetLinkEvent.builder()
                .passwordResetToken(passwordResetToken)
                .redirectUrl(urlBuilder)
                .build()
            );

            return ApiResponse.<String>data()
                .data("Password reset link sent successfully")
                .build();
        });

        return response.map(ResponseEntity::ok).orElseThrow(() -> new PasswordResetLinkException(
            request.getEmail(),
            "Couldn't create a valid token"
        ));
    }

    /**
     * Receives a new passwordResetRequest and sends the acknowledgement after
     * changing the password to the user's mail through the event.
     */
    @PostMapping("/password/reset")
    @ApiOperation(
        value = "Reset the password after verification and publish an event to send the acknowledgement email"
    )
    public ResponseEntity<ApiResponse<String>> resetPassword(
        @ApiParam(value = "The PasswordResetRequest payload") @Valid @RequestBody PasswordResetDto request
    ) {

        var response = authenticationService.resetPassword(request).map(changedUser -> {
            eventPublisher.publishEvent(UserAccountChangeEvent.builder()
                .user(changedUser)
                .action("Reset Password")
                .actionStatus("Changed Successfully")
                .build()
            );

            return ApiResponse.<String>data()
                .data("Password changed successfully")
                .build();
        });

        return response.map(ResponseEntity::ok).orElseThrow(() -> new PasswordResetException(
            request.getToken(),
            "Error in resetting password"
        ));
    }

    /**
     * Confirm the email verification token generated for the user during
     * registration. If token is invalid or token is expired, report error.
     */
    @GetMapping("/registration-confirmation")
    @ApiOperation(
        value = "Confirms the email verification token that has been generated for the user during registration"
    )
    public ResponseEntity<ApiResponse<String>> confirmRegistration(
        @ApiParam(value = "the token that was sent to the user email") @RequestParam("token") String token
    ) {
        var response = authenticationService.confirmEmailRegistration(token).map(user -> ApiResponse.<String>data()
            .data("User verified successfully")
            .build()
        );

        return response.map(ResponseEntity::ok).orElseThrow(() -> new InvalidTokenRequestException(
            "Email Verification Token",
            token,
            "Failed to confirm. Please generate a new email verification request"
        ));
    }

    /**
     * Resend the email registration mail with an updated token expiry. Safe to
     * assume that the user would always click on the last re-verification email and
     * any attempts at generating new token from past (possibly archived/deleted)
     * tokens should fail and report an exception.
     */
    @GetMapping("/resend-registration-token")
    @ApiOperation(
        value = "Resend the email registration with an updated token expiry. Safe to "
            + "assume that the user would always click on the last re-verification email and "
            + "any attempts at generating new token from past (possibly archived/deleted) "
            + "tokens should fail and report an exception. "
    )
    public ResponseEntity<ApiResponse<String>> resendRegistrationToken(
        @ApiParam(value = "the initial token that was sent to the user email after registration") @RequestParam("token") String token
    ) {
        var newEmailToken = authenticationService.recreateRegistrationToken(token).orElseThrow(() -> new InvalidTokenRequestException(
            "Email Verification Token",
            token,
            "User is already registered. No need to re-generate token")
        );

        var urlBuilder = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/auth/registration-confirmation");

        var response = Optional.ofNullable(newEmailToken.getUser()).map(registeredUser -> {
            eventPublisher.publishEvent(RegenerateEmailVerificationEvent.builder().user(registeredUser)
                .redirectUrl(urlBuilder)
                .token(newEmailToken)
                .build()
            );

            return ApiResponse.<String>data()
                .data("Email verification resent successfully")
                .build();
        });

        return response.map(ResponseEntity::ok).orElseThrow(() -> new InvalidTokenRequestException(
            "Email Verification Token",
            token,
            "No user associated with this request. Re-verification denied"
        ));
    }

    /**
     * Refresh the expired jwt token using a refresh token for the specific device
     * and return a new token to the caller
     */
    @PostMapping("/refresh")
    @ApiOperation(
        value = "Refresh the expired jwt authentication by issuing a token refresh request. "
            + "Returns the updated response tokens"
    )
    public ResponseEntity<JwtAuthenticationDto> refreshJwtToken(
        @ApiParam(value = "The TokenRefreshRequest payload") @Valid @RequestBody TokenRefreshDto request
    ) {
        var response = authenticationService.refreshJwtToken(request).map(updatedToken -> {
            var refreshToken = request.getRefreshToken();
            LOGGER.info("Created new Jwt Auth token: {}", updatedToken);

            return JwtAuthenticationDto.builder()
                .accessToken(updatedToken)
                .refreshToken(refreshToken).expiryDuration(tokenProvider.getExpiryDuration())
                .build();
        });

        return response.map(ResponseEntity::ok).orElseThrow(() -> new TokenRefreshException(
            request.getRefreshToken(),
            "Unexpected error during token refresh. Please logout and login again."
        ));
    }
}
