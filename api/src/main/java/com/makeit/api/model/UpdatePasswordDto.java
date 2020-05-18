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
@NoArgsConstructor
public class UpdatePasswordDto {
    @NotBlank(message = "Old password must not be blank")
    @ApiModelProperty(
        value = "Valid current user password",
        required = true,
        allowableValues = "Non empty string")
    private String oldPassword;

    @NotBlank(message = "New password must not be blank")
    @ApiModelProperty(
        value = "Valid new password string",
        required = true,
        allowableValues = "Non empty string")
    private String newPassword;
}
