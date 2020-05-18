package com.makeit.app.event;

import com.makeit.dao.model.EmailVerificationToken;
import com.makeit.dao.model.User;
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
public class RegenerateEmailVerificationEvent extends ApplicationEvent {

    private static final long serialVersionUID = 523853220362493666L;

    private final User user;
    private final transient UriComponentsBuilder redirectUrl;
    private final transient EmailVerificationToken token;

    @Builder
    public RegenerateEmailVerificationEvent(User user, UriComponentsBuilder redirectUrl, EmailVerificationToken token) {
        super(user);
        this.user = user;
        this.redirectUrl = redirectUrl;
        this.token = token;
    }
}
