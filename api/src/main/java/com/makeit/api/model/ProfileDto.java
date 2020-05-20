package com.makeit.api.model;

import lombok.*;
import lombok.experimental.*;

import java.time.LocalDate;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder(toBuilder = true)
@EqualsAndHashCode(callSuper = true)
public class ProfileDto extends BaseProfileDto {

    private static final long serialVersionUID = -5229521457590293797L;

    private String phoneNumber;
    private LocalDate birthday;
}
