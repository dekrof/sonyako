package com.makeit.api.service;

import com.makeit.dao.model.RefreshToken;
import com.makeit.dao.model.UserDevice;

import java.util.Optional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface RefreshTokenService {
    /**
     * Find a refresh token based on the natural id i.e the token itself
     */
    Optional<RefreshToken> findByToken(String token);

    /**
     * Persist the updated refreshToken instance to database
     */
    RefreshToken save(RefreshToken refreshToken);

    /**
     * Creates and returns a new refresh token
     */
    RefreshToken createRefreshToken(UserDevice userDevice);

    /**
     * Verify whether the token provided has expired or not on the basis of the current
     * server time and/or throw error otherwise
     */
    void verifyExpiration(RefreshToken token);

    /**
     * Delete the refresh token associated with the user device
     */
    void deleteById(Long id);

    /**
     * Increase the count of the token usage in the database. Useful for audit purposes.
     */
    void increaseCount(RefreshToken token);
}
