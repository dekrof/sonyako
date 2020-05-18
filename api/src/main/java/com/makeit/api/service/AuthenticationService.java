package com.makeit.api.service;

import com.makeit.api.model.LoginDto;
import com.makeit.api.model.PasswordResetDto;
import com.makeit.api.model.PasswordResetLinkDto;
import com.makeit.api.model.RegistrationDto;
import com.makeit.api.model.TokenRefreshDto;
import com.makeit.api.model.UpdatePasswordDto;
import com.makeit.dao.model.EmailVerificationToken;
import com.makeit.dao.model.PasswordResetToken;
import com.makeit.dao.model.RefreshToken;
import com.makeit.dao.model.User;
import com.makeit.security.JwtUserDetails;
import org.springframework.security.core.Authentication;

import java.util.Optional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface AuthenticationService {
    /**
     * Registers a new user in the database by performing a series of quick checks.
     *
     * @return A user object if successfully created
     */
    Optional<User> registerUser(RegistrationDto newRegistrationRequest);

    /**
     * Checks if the given email already exists in the database repository or not
     *
     * @return true if the email exists else false
     */
    Boolean emailAlreadyExists(String email);

    /**
     * Checks if the given email already exists in the database repository or not
     *
     * @return true if the email exists else false
     */
    Boolean usernameAlreadyExists(String username);

    /**
     * Authenticate user and log them in given a loginRequest
     */
    Optional<Authentication> authenticateUser(LoginDto request);

    /**
     * Confirms the user verification based on the token expiry and mark the user as active.
     * If user already verified, save the unnecessary database calls.
     */
    Optional<User> confirmEmailRegistration(String emailToken);

    /**
     * Attempt to regenerate a new email verification token given a valid
     * previous expired token. If the previous token is valid, increase its expiry
     * else update the token value and add a new expiration.
     */
    Optional<EmailVerificationToken> recreateRegistrationToken(String existingToken);

    /**
     * Updates the password of the current logged in user
     */
    Optional<User> updatePassword(JwtUserDetails userDetails, UpdatePasswordDto request);

    /**
     * Generates a JWT token for the validated client
     */
    String generateToken(JwtUserDetails userDetails);

    /**
     * Creates and persists the refresh token for the user device. If device exists
     * already, we don't care. Unused devices with expired tokens should be cleaned
     * with a cron job. The generated token would be encapsulated within the jwt.
     * Remove the existing refresh token as the old one should not remain valid.
     */
    Optional<RefreshToken> createAndPersistRefreshTokenForDevice(Authentication authentication, LoginDto request);

    /**
     * Refresh the expired jwt token using a refresh token and device info. The
     * * refresh token mapped to a specific device and if it is unexpired, can help
     * * generate a new jwt. If the refresh token is inactive for a device, or it is expired,
     * * throw appropriate errors.
     */
    Optional<String> refreshJwtToken(TokenRefreshDto request);

    /**
     * Generates a password reset token from the given reset request
     */
    Optional<PasswordResetToken> generatePasswordResetToken(PasswordResetLinkDto request);

    /**
     * Reset a password given a reset request and return the updated user
     */
    Optional<User> resetPassword(PasswordResetDto request);
}
