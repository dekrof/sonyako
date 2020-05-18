package com.makeit.api.service.impl;

import com.makeit.api.exception.InvalidTokenRequestException;
import com.makeit.api.service.EmailVerificationTokenService;
import com.makeit.dao.model.EmailVerificationToken;
import com.makeit.dao.model.TokenStatusType;
import com.makeit.dao.model.User;
import com.makeit.dao.repository.EmailVerificationTokenRepository;
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
public class EmailVerificationTokenServiceImpl implements EmailVerificationTokenService {

    @Value("${app.token.email.verification.duration}")
    private Long verificationDuration;

    private final EmailVerificationTokenRepository repository;

    /**
     * {@inheritDoc}
     */
    @Override
    public void createVerificationToken(User user, String value) {
        var token = EmailVerificationToken.builder()
            .token(value)
            .tokenStatus(TokenStatusType.STATUS_PENDING)
            .user(user)
            .expiryDate(Instant.now().plusMillis(verificationDuration))
            .build();

        LOGGER.info("Generated Email verification token=[{}]", token);
        repository.save(token);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public EmailVerificationToken updateExistingTokenWithNameAndExpiry(EmailVerificationToken existingToken) {
        var token = existingToken.toBuilder()
            .tokenStatus(TokenStatusType.STATUS_PENDING)
            .expiryDate(Instant.now())
            .build();

        LOGGER.info("Updated Email verification token=[{}]", token);
        return save(token);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<EmailVerificationToken> findByToken(String token) {
        return repository.findByToken(token);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public EmailVerificationToken save(EmailVerificationToken token) {
        return repository.save(token);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public String generateNewToken() {
        return UUID.randomUUID().toString();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void verifyExpiration(EmailVerificationToken token) {
        if (token.getExpiryDate().isBefore(Instant.now())) {
            throw new InvalidTokenRequestException(
                "Email Verification Token",
                token.getToken(),
                "Expired token. Please issue a new request"
            );
        }
    }
}
