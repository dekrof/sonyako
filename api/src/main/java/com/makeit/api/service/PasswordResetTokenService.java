package com.makeit.api.service;

import com.makeit.dao.model.PasswordResetToken;

import java.util.Optional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface PasswordResetTokenService {
    /**
     * Saves the given password reset token
     */
    PasswordResetToken save(PasswordResetToken token);

    /**
     * Finds a token in the database given its naturalId
     */
    Optional<PasswordResetToken> findByToken(String token);

    /**
     * Creates and returns a new password token to which a user must be associated
     */
    PasswordResetToken createToken();

    /**
     * Verify whether the token provided has expired or not on the basis of the current
     * server time and/or throw error otherwise
     */
    void verifyExpiration(PasswordResetToken token);
}
