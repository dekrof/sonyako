package com.makeit.app.event.listener;

import com.makeit.api.exception.MailSendException;
import com.makeit.api.service.EmailVerificationTokenService;
import com.makeit.api.service.MailService;
import com.makeit.app.event.UserRegistrationCompleteEvent;
import freemarker.template.TemplateException;
import lombok.extern.slf4j.*;
import org.springframework.context.ApplicationListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.mail.MessagingException;
import java.io.IOException;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@Component
public class UserRegistrationCompleteEventListener implements ApplicationListener<UserRegistrationCompleteEvent> {

    private final EmailVerificationTokenService emailVerificationTokenService;
    private final MailService mailService;

    @Inject
    public UserRegistrationCompleteEventListener(
        EmailVerificationTokenService emailVerificationTokenService,
        MailService mailService
    ) {
        this.emailVerificationTokenService = emailVerificationTokenService;
        this.mailService = mailService;
    }

    /**
     * As soon as a registration event is complete, invoke the email verification
     * asynchronously in an another thread pool
     */
    @Async
    @Override
    public void onApplicationEvent(UserRegistrationCompleteEvent event) {
        sendEmailVerification(event);
    }

    /**
     * Send email verification to the user and persist the token in the database.
     */
    private void sendEmailVerification(UserRegistrationCompleteEvent event) {
        var user = event.getUser();
        var token = emailVerificationTokenService.generateNewToken();
        emailVerificationTokenService.createVerificationToken(user, token);

        var recipientAddress = user.getProfile().getEmail();
        var emailConfirmationUrl = event.getRedirectUrl()
            .queryParam("token", token)
            .toUriString();

        try {
            mailService.sendEmailVerification(emailConfirmationUrl, recipientAddress);
            LOGGER.info("The email about confirmation of registration is successfully sent");
        } catch (IOException | TemplateException | MessagingException ex) {
            LOGGER.error("Unable to send email about confirmation of registration", ex);
            throw new MailSendException(recipientAddress, "Email Verification");
        }
    }
}
