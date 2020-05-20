package com.makeit.security;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.exception.InvalidTokenRequestException;
import com.makeit.dao.model.User;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@Component
public class JwtTokenProvider {

    private static final String TOKEN_TYPE = "JWT";

    @Value("${app.jwt.secret}")
    private String jwtSecret;

    @Value("${app.jwt.expiration}")
    private Long jwtExpirationInMs;

    @Value("${app.jwt.claims.refresh.name}")
    private String jwtClaimRefreshName;

    @Inject
    private ObjectMapper objectMapper;

    /**
     * Generates a token from a principal object. Embed the refresh token in the JWT so that a new JWT can be created.
     *
     * @param user the current user
     * @return the compact URL-safe JWT as string.
     */
    public String generateToken(User user) {
        var now = Instant.now();
        var expiryDate = now.plusMillis(jwtExpirationInMs);
        return Jwts.builder()
            .setSubject(Long.toString(user.getId()))
            .setIssuedAt(Date.from(now))
            .setExpiration(Date.from(expiryDate))
            .setClaims(objectMapper.convertValue(user.getProfile(), new TypeReference<Map<String, Object>>() {
            }))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }

    /**
     * Generates a token from a principal object. Embed the refresh token in the JWT so that a new jwt can be created.
     *
     * @param userId the ID of current user.
     * @return the compact URL-safe JWT as string.
     */
    public String generateTokenFromUserId(Long userId) {
        var now = Instant.now();
        var expiryDate = now.plusMillis(jwtExpirationInMs);
        return Jwts.builder()
            .setSubject(Long.toString(userId))
            .setIssuedAt(Date.from(now))
            .setExpiration(Date.from(expiryDate))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }

    /**
     * Returns the user id encapsulated within the token.
     *
     * @param token the compact URL-safe JWT as string
     * @return the ID of current user.
     */
    public Long getUserIdFromJWT(String token) {
        var claims = Jwts.parser()
            .setSigningKey(jwtSecret)
            .parseClaimsJws(token)
            .getBody();

        return Long.parseLong(claims.getSubject());
    }

    /**
     * Return the jwt expiration for the client so that they can execute the refresh token logic appropriately.
     *
     * @return the expiration time in millis
     */
    public Long getExpiryDuration() {
        return jwtExpirationInMs;
    }

    /**
     * Validates if a token has the correct not malformed signature and is not expired or unsupported.
     *
     * @param token the compact URL-safe JWT as string.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token);
            return true;
        } catch (SignatureException ex) {
            LOGGER.error("Invalid JWT signature", ex);
            throw new InvalidTokenRequestException(TOKEN_TYPE, token, "Incorrect signature");
        } catch (MalformedJwtException ex) {
            LOGGER.error("Invalid JWT token", ex);
            throw new InvalidTokenRequestException(TOKEN_TYPE, token, "Malformed jwt token");
        } catch (ExpiredJwtException ex) {
            LOGGER.error("Expired JWT token", ex);
            throw new InvalidTokenRequestException(TOKEN_TYPE, token, "Token expired. Refresh required");
        } catch (UnsupportedJwtException ex) {
            LOGGER.error("Unsupported JWT token", ex);
            throw new InvalidTokenRequestException(TOKEN_TYPE, token, "Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            LOGGER.error("JWT claims string is empty", ex);
            throw new InvalidTokenRequestException(TOKEN_TYPE, token, "Illegal argument token");
        } finally {
            return false;
        }
    }
}
