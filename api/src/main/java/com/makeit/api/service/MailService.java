package com.makeit.api.service;

import freemarker.template.TemplateException;

import javax.mail.MessagingException;
import java.io.IOException;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface MailService {


    /**
     * Sends an email to verify registration via email.
     * @param emailVerificationUrl the verification email
     * @param to the mail participant.
     */
    void sendEmailVerification(String emailVerificationUrl, String to) throws IOException, TemplateException, MessagingException;

    /**
     * Sends the reset link to the respective user's mail.
     * @param resetPasswordLink the link to reset password
     * @param to the mail participant.
     */
    void sendResetLink(String resetPasswordLink, String to) throws IOException, MessagingException, TemplateException;

    /**
     * Sends an email to the user indicating an account change event with the correct status.
     * @param action the action to be performed
     * @param actionStatus the current status of action
     * @param to the mail participant.
     */
    void sendAccountChangeEmail(String action, String actionStatus, String to) throws IOException, MessagingException, TemplateException;
}
