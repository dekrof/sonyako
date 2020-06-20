package com.makeit.api.model;

import io.swagger.annotations.ApiModel;
import lombok.*;

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
public class SkillRatingDto {
    private UserDto user;
    private SkillDto skill;
    private double rating;
}
