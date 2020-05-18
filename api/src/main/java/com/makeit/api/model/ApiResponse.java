package com.makeit.api.model;

import lombok.*;

import java.time.Instant;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ApiResponse<T> {

    private T data;
    private Boolean success;
    private Instant timestamp;
    private String cause;
    private String path;

    @Builder(builderClassName = "ErrorApiResponseBuilder", builderMethodName = "error")
    public ApiResponse(T data, String cause, String path) {
        this(data, false, Instant.now(), cause, path);
    }

    @Builder(builderClassName = "DataApiResponseBuilder", builderMethodName = "data")
    public ApiResponse(T data) {
        this(data, true, Instant.now(), null, null);
    }
}
