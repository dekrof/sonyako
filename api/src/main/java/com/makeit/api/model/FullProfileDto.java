package com.makeit.api.model;

import lombok.*;
import lombok.experimental.*;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@SuperBuilder(toBuilder = true)
@EqualsAndHashCode(callSuper = true)
public class FullProfileDto extends ProfileDto {

    private static final long serialVersionUID = -5806873270192691557L;

    private AddressDto address;
}
