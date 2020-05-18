package com.makeit.app.event.listener;

import com.makeit.api.exception.MailSendException;
import com.makeit.api.service.MailService;
import com.makeit.app.event.GenerateResetLinkEvent;
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
public class GenerateResetLinkEventListener implements ApplicationListener<GenerateResetLinkEvent> {

    private final MailService mailService;

    @Inject
    public GenerateResetLinkEventListener(MailService mailService) {
        this.mailService = mailService;
    }

    /**
     * As soon as a forgot password link clicked, and a valid email id entered,
     * the reset password link will be sent to respective mail via this event.
     */
    @Async
    @Override
    public void onApplicationEvent(GenerateResetLinkEvent event) {
        sendResetLink(event);
    }

    /**
     * Sends reset link to the mail address with a password reset link token.
     */
    private void sendResetLink(GenerateResetLinkEvent event) {
        var passwordResetToken = event.getPasswordResetToken();
        var user = passwordResetToken.getUser();
        var recipientAddress = user.getProfile().getEmail();

        var emailConfirmationUrl = event.getRedirectUrl()
            .queryParam("token", passwordResetToken.getToken())
            .toUriString();

        try {
            mailService.sendResetLink(emailConfirmationUrl, recipientAddress);
            LOGGER.info("The email to reset password is successfully sent");
        } catch (IOException | TemplateException | MessagingException ex) {
            LOGGER.error("Unable to send the email to reset password", ex);
            throw new MailSendException(recipientAddress, "Email Verification");
        }
    }
}
