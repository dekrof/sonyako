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
public class PasswordResetException extends RuntimeException {

    private static final long serialVersionUID = 5022443571809082932L;

    private final String user;
    private final String message;

    public PasswordResetException(String user, String message) {
        super(String.format("Couldn't reset password for [%s]: [%s])", user, message));
        this.user = user;
        this.message = message;
    }
}