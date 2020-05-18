package com.makeit.api.service.impl;

import com.makeit.api.mail.Mail;
import com.makeit.api.service.MailService;
import freemarker.template.Configuration;
import freemarker.template.TemplateException;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.inject.Inject;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class MailServiceImpl implements MailService {

    @Value("${app.velocity.templates.location}")
    private String basePackagePath;

    @Value("${spring.mail.username}")
    private String mailFrom;

    @Value("${app.token.password.reset.duration}")
    private Long expiration;

    private final JavaMailSender mailSender;

    private final Configuration templateConfiguration;

    /**
     * {@inheritDoc}
     */
    @Override
    public void sendEmailVerification(String verificationUrl, String to) throws IOException, TemplateException, MessagingException {

        var mail = new Mail();
        mail.setSubject("Email Verification");
        mail.setTo(to);
        mail.setFrom(mailFrom);
        mail.getModel().put("userName", to);
        mail.getModel().put("userEmailTokenVerificationLink", verificationUrl);

        templateConfiguration.setClassForTemplateLoading(getClass(), basePackagePath);

        var template = templateConfiguration.getTemplate("email-verification.ftl");
        var mailContent = FreeMarkerTemplateUtils.processTemplateIntoString(template, mail.getModel());

        send(mail.toBuilder().content(mailContent).build());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void sendResetLink(String resetPasswordLink, String to) throws IOException, MessagingException, TemplateException {
        var expirationInMinutes = TimeUnit.MILLISECONDS.toMinutes(expiration);
        var expirationInMinutesString = Long.toString(expirationInMinutes);

        var mail = Mail.builder()
            .subject("Password Reset Link")
            .to(to)
            .from(mailFrom)
            .model(Map.ofEntries(
                Map.entry("userName", to),
                Map.entry("userResetPasswordLink", resetPasswordLink),
                Map.entry("expirationTime", expirationInMinutesString)
            )).build();

        templateConfiguration.setClassForTemplateLoading(getClass(), basePackagePath);

        var template = templateConfiguration.getTemplate("reset-link.ftl");
        var mailContent = FreeMarkerTemplateUtils.processTemplateIntoString(template, mail.getModel());

        mail.setContent(mailContent);
        send(mail);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void sendAccountChangeEmail(String action, String actionStatus, String to) throws IOException, MessagingException, TemplateException {
        var mail = Mail.builder()
            .subject("Account Status Change")
            .to(to)
            .from(mailFrom)
            .model(Map.ofEntries(
                Map.entry("userName", to),
                Map.entry("action", action),
                Map.entry("actionStatus", actionStatus)
            )).build();

        templateConfiguration.setClassForTemplateLoading(getClass(), basePackagePath);
        var template = templateConfiguration.getTemplate("account-activity-change.ftl");
        var mailContent = FreeMarkerTemplateUtils.processTemplateIntoString(template, mail.getModel());

        mail.setContent(mailContent);
        send(mail);
    }

    /**
     * Sends a simple mail as a MIME Multipart message
     *
     * @param mail the mail to be sent
     */
    private void send(Mail mail) throws MessagingException {
        var message = mailSender.createMimeMessage();
        var helper = getHelper(message);

        helper.setTo(mail.getTo());
        helper.setText(mail.getContent(), true);
        helper.setSubject(mail.getSubject());
        helper.setFrom(mail.getFrom());

        mailSender.send(message);
    }

    /**
     * Creates message helper
     *
     * @param message the message to be sent
     * @return a new helper
     * @throws MessagingException
     */
    private static MimeMessageHelper getHelper(MimeMessage message) throws MessagingException {
        return new MimeMessageHelper(
            message,
            MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
            StandardCharsets.UTF_8.name()
        );
    }
}
