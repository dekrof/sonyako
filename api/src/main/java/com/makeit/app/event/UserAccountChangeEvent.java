package com.makeit.app.event;

import com.makeit.dao.model.User;
import lombok.*;
import org.springframework.context.ApplicationEvent;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Getter
@EqualsAndHashCode(callSuper = true)
public class UserAccountChangeEvent extends ApplicationEvent {

    private static final long serialVersionUID = -4444880485614769880L;

    private final User user;
    private final String action;
    private final String actionStatus;

    @Builder
    public UserAccountChangeEvent(User user, String action, String actionStatus) {
        super(user);
        this.user = user;
        this.action = action;
        this.actionStatus = actionStatus;
    }
}
