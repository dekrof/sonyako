package com.makeit.api.model;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.Set;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@ApiModel
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TopDeveloperDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String avatarUrl;
    private Set<TagDto> tags;
    private AddressDto address;
}
