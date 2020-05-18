package com.makeit.api.model;

import lombok.*;
import lombok.experimental.*;

import java.io.Serializable;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@SuperBuilder(toBuilder = true)
public class BaseProfileDto implements Serializable {

    private static final long serialVersionUID = 2323468696907266977L;

    private Long id;
    private String email;
    private String name;
    private String patronymicName;
    private String surname;
    private String avatarUrl;
}
