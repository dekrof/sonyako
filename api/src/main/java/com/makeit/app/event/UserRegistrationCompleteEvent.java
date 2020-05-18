package com.makeit.app.event;

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
public class UserRegistrationCompleteEvent extends ApplicationEvent {

    private static final long serialVersionUID = 6253879051350589473L;

    private final transient UriComponentsBuilder redirectUrl;
    private final User user;

    @Builder
    public UserRegistrationCompleteEvent(User user, UriComponentsBuilder redirectUrl) {
        super(user);
        this.user = user;
        this.redirectUrl = redirectUrl;
    }
}
