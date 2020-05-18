package com.makeit.app.event.listener;

import com.makeit.api.exception.MailSendException;
import com.makeit.api.service.MailService;
import com.makeit.app.event.UserAccountChangeEvent;
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
public class UserAccountChangeEventListener implements ApplicationListener<UserAccountChangeEvent> {

    private final MailService mailService;

    @Inject
    public UserAccountChangeEventListener(MailService mailService) {
        this.mailService = mailService;
    }

    /**
     * As soon as a registration event is complete, invoke the email verification
     * asynchronously in another thread pool
     */
    @Async
    @Override
    public void onApplicationEvent(UserAccountChangeEvent event) {
        sendAccountChangeEmail(event);
    }

    /**
     * Send email verification to the user and persist the token in the database.
     */
    private void sendAccountChangeEmail(UserAccountChangeEvent event) {
        var user = event.getUser();
        var action = event.getAction();
        var actionStatus = event.getActionStatus();
        var recipientAddress = user.getProfile().getEmail();

        try {
            mailService.sendAccountChangeEmail(action, actionStatus, recipientAddress);
            LOGGER.info("The email to change account is successfully sent");
        } catch (IOException | TemplateException | MessagingException ex) {
            LOGGER.error("Unable to send email to change account", ex);
            throw new MailSendException(recipientAddress, "Account Change Mail");
        }
    }
}
