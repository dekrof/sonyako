package com.makeit.app.event;

import com.makeit.dao.model.PasswordResetToken;
import lombok.*;
import org.springframework.context.ApplicationEvent;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Getter
@EqualsAndHashCode(callSuper = true)
public class GenerateResetLinkEvent extends ApplicationEvent {

    private static final long serialVersionUID = -3785003240874160966L;

    private final transient UriComponentsBuilder redirectUrl;

    private final transient PasswordResetToken passwordResetToken;

    @Builder
    public GenerateResetLinkEvent(PasswordResetToken passwordResetToken, UriComponentsBuilder redirectUrl) {
        super(passwordResetToken);

        this.passwordResetToken = passwordResetToken;
        this.redirectUrl = redirectUrl;
    }
}