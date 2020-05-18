package com.makeit.api.service.impl;

import com.makeit.api.exception.InvalidTokenRequestException;
import com.makeit.dao.model.PasswordResetToken;
import com.makeit.dao.repository.PasswordResetTokenRepository;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class PasswordResetTokenServiceImpl implements com.makeit.api.service.PasswordResetTokenService {

    private final PasswordResetTokenRepository repository;

    @Value("${app.token.password.reset.duration}")
    private Long expiration;

    /**
     * {@inheritDoc}
     */
    @Override
    public PasswordResetToken save(PasswordResetToken token) {
        return repository.save(token);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<PasswordResetToken> findByToken(String token) {
        return repository.findByToken(token);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public PasswordResetToken createToken() {
        var passwordResetToken = PasswordResetToken.builder()
            .token(UUID.randomUUID().toString())
            .expiryDate(Instant.now().plusMillis(expiration))
            .build();
        return save(passwordResetToken);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void verifyExpiration(PasswordResetToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            throw new InvalidTokenRequestException(
                "Password Reset Token",
                token.getToken(),
                "Expired token. Please issue a new request"
            );
        }
    }
}
