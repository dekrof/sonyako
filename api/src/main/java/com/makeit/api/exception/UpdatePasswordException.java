package com.makeit.api.exception;

import lombok.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Getter
@ResponseStatus(HttpStatus.EXPECTATION_FAILED)
public class UpdatePasswordException extends RuntimeException {

    private static final long serialVersionUID = 6098330858103045532L;

    private final String user;
    private final String message;

    public UpdatePasswordException(String user, String message) {
        super(String.format("Couldn't update password for [%s]: [%s])", user, message));
        this.user = user;
        this.message = message;
    }
}