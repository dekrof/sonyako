package com.makeit.api.service.impl;

import com.makeit.api.exception.TokenRefreshException;
import com.makeit.dao.model.RefreshToken;
import com.makeit.dao.repository.RefreshTokenRepository;
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
public class RefreshTokenServiceImpl implements com.makeit.api.service.RefreshTokenService {

    @Value("${app.token.refresh.duration}")
    private Long refreshTokenDuration;

    private final RefreshTokenRepository repository;

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<RefreshToken> findByToken(String token) {
        return repository.findByToken(token);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RefreshToken save(RefreshToken refreshToken) {
        return repository.save(refreshToken);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public RefreshToken createRefreshToken() {
        var refreshToken = RefreshToken.builder()
            .token(UUID.randomUUID().toString())
            .expiryDate(Instant.now().plusMillis(refreshTokenDuration))
            .refreshCount(0L)
            .build();

        return save(refreshToken);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            throw new TokenRefreshException(token.getToken(), "Expired token. Please issue a new request");
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void increaseCount(RefreshToken token) {
        token.incrementRefreshCount();
        save(token);
    }
}
