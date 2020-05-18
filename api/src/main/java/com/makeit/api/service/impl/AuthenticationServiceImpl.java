package com.makeit.api.service.impl;

import com.makeit.api.exception.PasswordResetLinkException;
import com.makeit.api.exception.ResourceAlreadyInUseException;
import com.makeit.api.exception.ResourceNotFoundException;
import com.makeit.api.exception.TokenRefreshException;
import com.makeit.api.exception.UpdatePasswordException;
import com.makeit.api.model.LoginDto;
import com.makeit.api.model.PasswordResetDto;
import com.makeit.api.model.PasswordResetLinkDto;
import com.makeit.api.model.RegistrationDto;
import com.makeit.api.model.TokenRefreshDto;
import com.makeit.api.model.UpdatePasswordDto;
import com.makeit.api.service.EmailVerificationTokenService;
import com.makeit.api.service.PasswordResetTokenService;
import com.makeit.api.service.RefreshTokenService;
import com.makeit.api.service.UserDeviceService;
import com.makeit.api.service.UserService;
import com.makeit.dao.model.EmailVerificationToken;
import com.makeit.dao.model.PasswordResetToken;
import com.makeit.dao.model.RefreshToken;
import com.makeit.dao.model.TokenStatusType;
import com.makeit.dao.model.User;
import com.makeit.dao.model.UserDevice;
import com.makeit.security.JwtTokenProvider;
import com.makeit.security.JwtUserDetails;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.UnaryOperator;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class AuthenticationServiceImpl implements com.makeit.api.service.AuthenticationService {

    @Lazy
    @Inject
    private PasswordEncoder passwordEncoder;

    @Lazy
    @Inject
    private AuthenticationManager authenticationManager;

    private final JwtTokenProvider tokenProvider;
    private final UserService userService;
    private final UserDeviceService userDeviceService;
    private final RefreshTokenService refreshTokenService;
    private final PasswordResetTokenService passwordResetTokenService;
    private final EmailVerificationTokenService emailVerificationTokenService;

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<User> registerUser(RegistrationDto newRegistrationRequest) {
        var newRegistrationRequestEmail = newRegistrationRequest.getEmail();

        if (emailAlreadyExists(newRegistrationRequestEmail)) {
            LOGGER.error("Email already exists: {}",  newRegistrationRequestEmail);
            throw new ResourceAlreadyInUseException("Email", "Profile", newRegistrationRequestEmail);
        }

        LOGGER.info("Trying to register new user=[{}]", newRegistrationRequestEmail);
        return Optional.of(userService.createUser(newRegistrationRequest));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean emailAlreadyExists(String email) {
        return userService.existsByEmail(email);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean usernameAlreadyExists(String username) {
        return userService.existsByUsername(username);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<Authentication> authenticateUser(LoginDto request) {
        var authentication = new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword());
        return Optional.ofNullable(authenticationManager.authenticate(authentication));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<User> confirmEmailRegistration(String emailToken) {
        var token = emailVerificationTokenService.findByToken(emailToken).orElseThrow(() -> new ResourceNotFoundException(
            "Token",
            "Email verification",
            emailToken
        ));

        var registeredUser = token.getUser();
        if (registeredUser.isEmailVerified()) {
            LOGGER.info("User for token='{}' already registered.", emailToken);
            return Optional.of(registeredUser);
        }

        emailVerificationTokenService.verifyExpiration(token);

        var confirmedToken = token.toBuilder()
            .tokenStatus(TokenStatusType.STATUS_CONFIRMED)
            .build();

        emailVerificationTokenService.save(confirmedToken);

        var confirmedUser = registeredUser.toBuilder()
            .emailVerified(true)
            .build();

        return Optional.of(userService.save(confirmedUser));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<EmailVerificationToken> recreateRegistrationToken(String existingToken) {
        var token = emailVerificationTokenService.findByToken(existingToken)
            .orElseThrow(() -> new ResourceNotFoundException("Token", "Existing email verification", existingToken));

        if (token.getUser().isEmailVerified()) {
            return Optional.empty();
        }

        return Optional.of(emailVerificationTokenService.updateExistingTokenWithNameAndExpiry(token));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<User> updatePassword(JwtUserDetails userDetails, UpdatePasswordDto request) {
        var email = userDetails.getUsername();
        // todo fix;
        var currentUser = userService.findByUsername(email).orElseThrow(() -> new UpdatePasswordException(
            email,
            "No matching user found"
        ));

        if (!currentPasswordMatches(currentUser, request.getOldPassword())) {
            LOGGER.info("Password provided by user is invalid");
            throw new UpdatePasswordException(currentUser.getProfile().getEmail(), "Invalid current password");
        }

        var user = currentUser.toBuilder()
            .password(passwordEncoder.encode(request.getNewPassword()))
            .build();

        return Optional.of(userService.save(user));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String generateToken(JwtUserDetails userDetails) {
        return tokenProvider.generateToken(userDetails.getUser());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<RefreshToken> createAndPersistRefreshTokenForDevice(Authentication authentication, LoginDto request) {
        var currentUser = (User) authentication.getPrincipal();

        userDeviceService.findByUserId(currentUser.getId())
            .map(UserDevice::getRefreshToken)
            .map(RefreshToken::getId)
            .ifPresent(refreshTokenService::deleteById);

        var userDevice = userDeviceService.createUserDevice(request.getDeviceInfo());
        var refreshToken = refreshTokenService.createRefreshToken();

        var device = userDevice.toBuilder()
            .user(currentUser)
            .refreshToken(refreshToken)
            .build();

        refreshToken.setUserDevice(device);
        return Optional.of(refreshTokenService.save(refreshToken));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<String> refreshJwtToken(TokenRefreshDto request) {

        UnaryOperator<RefreshToken> mapper = token -> {
            userDeviceService.verifyRefreshAvailability(token);

            refreshTokenService.verifyExpiration(token);
            refreshTokenService.increaseCount(token);

            return token;
        };

        var refreshToken = request.getRefreshToken();
        var token = refreshTokenService.findByToken(refreshToken)
            .map(mapper)
            .map(RefreshToken::getUserDevice)
            .map(UserDevice::getUser)
            .map(User::getId)
            .map(this::generateTokenFromUserId)
            .orElseThrow(() -> new TokenRefreshException(
                refreshToken,
                "Missing refresh token in database. Please login again"
            ));

        return Optional.of(token);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<PasswordResetToken> generatePasswordResetToken(PasswordResetLinkDto request) {
        var email = request.getEmail();

        Function<User, PasswordResetToken> mapper = user -> passwordResetTokenService.createToken()
            .toBuilder()
            .user(user)
            .build();

        // todo fix
        return userService.findByUsername(email)
            .map(mapper)
            .map(passwordResetTokenService::save)
            .map(Optional::of)
            .orElseThrow(() -> new PasswordResetLinkException(email, "No matching user found for the given request"));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<User> resetPassword(PasswordResetDto request) {
        var token = request.getToken();

        var passwordResetToken = passwordResetTokenService.findByToken(token).orElseThrow(() -> new ResourceNotFoundException(
            "Password Reset Token",
            "Token Id",
            token
        ));

        passwordResetTokenService.verifyExpiration(passwordResetToken);

        UnaryOperator<User> mapper = user -> user.toBuilder()
            .password(passwordEncoder.encode(request.getPassword()))
            .build();

        return Optional.of(passwordResetToken)
            .map(PasswordResetToken::getUser)
            .map(mapper)
            .map(userService::save);
    }

    /**
     * Generates a JWT token for the validated client by userId
     */
    private String generateTokenFromUserId(Long userId) {
        return tokenProvider.generateTokenFromUserId(userId);
    }

    /**
     * Validates the password of the current logged in user with the given password
     */
    private boolean currentPasswordMatches(User currentUser, String password) {
        return passwordEncoder.matches(password, currentUser.getPassword());
    }
}
