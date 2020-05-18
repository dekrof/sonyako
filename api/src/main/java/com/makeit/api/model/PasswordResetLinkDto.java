package com.makeit.api.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;

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
public class PasswordResetLinkDto {

    @NotBlank(message = "Email cannot be blank")
    @ApiModelProperty(
        value = "User registered email",
        required = true,
        allowableValues = "Non empty string")
    private String email;
}
