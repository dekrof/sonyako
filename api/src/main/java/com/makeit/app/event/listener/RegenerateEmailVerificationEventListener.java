package com.makeit.app.event.listener;

import com.makeit.api.exception.MailSendException;
import com.makeit.api.service.MailService;
import com.makeit.app.event.RegenerateEmailVerificationEvent;
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
public class RegenerateEmailVerificationEventListener implements ApplicationListener<RegenerateEmailVerificationEvent> {

    private final MailService mailService;

    @Inject
    public RegenerateEmailVerificationEventListener(MailService mailService) {
        this.mailService = mailService;
    }

    /**
     * As soon as a registration event is complete, invoke the email verification
     */
    @Async
    @Override
    public void onApplicationEvent(RegenerateEmailVerificationEvent event) {
        resendEmailVerification(event);
    }

    /**
     * Send email verification to the user and persist the token in the database.
     */
    private void resendEmailVerification(RegenerateEmailVerificationEvent event) {
        var user = event.getUser();
        var emailVerificationToken = event.getToken();
        var recipientAddress = user.getProfile().getEmail();

        var emailConfirmationUrl = event.getRedirectUrl()
            .queryParam("token", emailVerificationToken.getToken())
            .toUriString();
        try {
            mailService.sendEmailVerification(emailConfirmationUrl, recipientAddress);
            LOGGER.info("The verification email is successfully sent");
        } catch (IOException | TemplateException | MessagingException ex) {
            LOGGER.error("Unable to send verification email", ex);
            throw new MailSendException(recipientAddress, "Email Verification");
        }
    }
}
