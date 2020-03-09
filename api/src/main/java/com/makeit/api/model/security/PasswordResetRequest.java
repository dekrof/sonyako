package com.makeit.api.model.security;

import com.makeit.validation.MatchPassword;
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
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@MatchPassword
@ApiModel(value = "Password reset Request", description = "The password reset request payload")
public class PasswordResetRequest {

    @NotBlank(message = "Password cannot be blank")
    @ApiModelProperty(
        value = "New user password",
        required = true,
        allowableValues = "NonEmpty String"
    )
    private String password;

    @NotBlank(message = "Confirm Password cannot be blank")
    @ApiModelProperty(
        value = "Must match the new user password. Else exception will be thrown",
        required = true,
        allowableValues = "NonEmpty String matching the password"
    )
    private String confirmPassword;

    @NotBlank(message = "Token has to be supplied along with a password reset request")
    @ApiModelProperty(
        value = "Reset token received in mail",
        required = true,
        allowableValues = "NonEmpty String"
    )
    private String token;
}
