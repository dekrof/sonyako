package com.makeit.api.controller;

import com.makeit.api.exception.UpdatePasswordException;
import com.makeit.api.model.ApiResponse;
import com.makeit.api.model.LogoutDto;
import com.makeit.api.model.UpdatePasswordDto;
import com.makeit.api.service.AuthenticationService;
import com.makeit.api.service.UserService;
import com.makeit.app.event.UserAccountChangeEvent;
import com.makeit.dao.model.RoleName;
import com.makeit.dao.model.User;
import com.makeit.security.JwtUserDetails;
import com.makeit.supported.annotation.CurrentUser;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import javax.inject.Inject;
import javax.validation.Valid;
import java.util.List;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Api(
    value = "User Rest API",
    description = "Defines endpoints for the logged in user. It's secured by default"
)
@Slf4j
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class UserController {

    private final AuthenticationService authenticationService;
    private final UserService userService;
    private final ApplicationEventPublisher eventPublisher;

    /**
     * Gets the current user profile of the logged in user
     */
    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    @ApiOperation(
        value = "Returns the current user profile"
    )
    public ResponseEntity<User> getUserProfile(
        @ApiIgnore @CurrentUser JwtUserDetails currentUser
    ) {
        LOGGER.info("User: {}, has role(s): {}", currentUser.getUsername(), currentUser.getUser().getRoles());
        return ResponseEntity.ok(currentUser.getUser());
    }

    /**
     * Returns all admins in the system. Requires Admin access
     */
    @GetMapping("/admins")
    @PreAuthorize("hasRole('ADMIN')")
    @ApiOperation(
        value = "Returns the list of configured admins. Requires ADMIN Access"
    )
    public ResponseEntity<List<User>> getAllAdmins() {
        LOGGER.info("Inside secured resource with admin");
        return ResponseEntity.ok(userService.findAllByRoles(RoleName.ROLE_ADMIN));
    }

    /**
     * Updates the password of the current logged in user
     */
    @PostMapping("/password/update")
    @PreAuthorize("hasRole('USER')")
    @ApiOperation(
        value = "Allows the user to change his password once logged in by supplying the correct current password"
    )
    public ResponseEntity<ApiResponse<String>> updateUserPassword(
        @ApiIgnore @CurrentUser JwtUserDetails userDetails,
        @ApiParam(value = "The UpdatePasswordRequest payload") @Valid @RequestBody UpdatePasswordDto request
    ) {
        var response = authenticationService.updatePassword(userDetails, request)
            .map(updatedUser -> {
                eventPublisher.publishEvent(UserAccountChangeEvent.builder()
                    .user(updatedUser)
                    .action("Update Password")
                    .actionStatus("Change successful")
                    .build()
                );

                return ApiResponse.<String>data()
                    .data("Password changed successfully")
                    .build();
            });

        return response.map(ResponseEntity::ok).orElseThrow(() -> new UpdatePasswordException(
            "--Empty--",
            "No such user present."
        ));
    }

    /**
     * Log the user out from the app/device. Release the refresh token associated with the
     * user device.
     */
    @PostMapping("/logout")
    @ApiOperation(
        value = "Logs the specified user device and clears the refresh tokens associated with it"
    )
    public ResponseEntity<ApiResponse<String>> logoutUser(
        @ApiIgnore @CurrentUser JwtUserDetails customUserDetails,
        @ApiParam(value = "The LogOutRequest payload") @Valid @RequestBody LogoutDto request
    ) {
        userService.logoutUser(customUserDetails, request);

        return ResponseEntity.ok(ApiResponse.<String>data()
            .data("Log out successful")
            .build()
        );
    }
}
