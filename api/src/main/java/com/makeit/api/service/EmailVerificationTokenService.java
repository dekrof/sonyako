package com.makeit.api.service;

import com.makeit.dao.model.EmailVerificationToken;
import com.makeit.dao.model.User;

import java.util.Optional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface EmailVerificationTokenService {
    /**
     * Create an email verification token and persist it in the database which will be
     * verified by the user
     */
    void createVerificationToken(User user, String value);

    /**
     * Updates an existing token in the database with a new expiration
     */
    EmailVerificationToken updateExistingTokenWithNameAndExpiry(EmailVerificationToken existingToken);

    /**
     * Finds an email verification token by the @NaturalId token
     */
    Optional<EmailVerificationToken> findByToken(String token);

    /**
     * Saves an email verification token in the repository
     */
    EmailVerificationToken save(EmailVerificationToken token);

    /**
     * Generates a new random UUID to be used as the token for email verification
     */
    String generateNewToken();

    /**
     * Verify whether the token provided has expired or not on the basis of the current
     * server time and/or throw error otherwise
     */
    void verifyExpiration(EmailVerificationToken token);
}
