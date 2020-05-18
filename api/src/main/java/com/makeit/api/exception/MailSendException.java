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
@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
public class MailSendException extends RuntimeException {

    private static final long serialVersionUID = 4780529067718576856L;

    private final String recipientAddress;
    private final String message;

    public MailSendException(String recipientAddress, String message) {
        super(String.format("Error sending [%s] for user [%s]", message, recipientAddress));
        this.recipientAddress = recipientAddress;
        this.message = message;
    }
}