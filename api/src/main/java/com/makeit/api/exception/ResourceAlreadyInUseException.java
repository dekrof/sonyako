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
@ResponseStatus(HttpStatus.IM_USED)
public class ResourceAlreadyInUseException extends RuntimeException {

    private static final long serialVersionUID = -7661529454665722954L;

    private final String resourceName;
    private final String fieldName;
    private final transient Object fieldValue;

    public ResourceAlreadyInUseException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s already in use with %s : '%s'", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
}