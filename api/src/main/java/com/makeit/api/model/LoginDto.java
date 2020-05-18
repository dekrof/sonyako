package com.makeit.api.model;

import com.makeit.supported.validation.NullOrNotBlank;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@ApiModel
public class LoginDto {

    @NullOrNotBlank(message = "Login Username can be null but not blank")
    @ApiModelProperty(
        value = "Registered username",
        allowableValues = "Non empty string")
    private String username;

    @NullOrNotBlank(message = "Login Email can be null but not blank")
    @ApiModelProperty(
        value = "User registered email",
        required = true,
        allowableValues = "Non empty string")
    private String email;

    @NotNull(message = "Login password cannot be blank")
    @ApiModelProperty(
        value = "Valid user password",
        required = true,
        allowableValues = "Non empty string")
    private String password;

    @Valid
    @NotNull(message = "Device info cannot be null")
    @ApiModelProperty(
        value = "Device info",
        required = true
    )
    private DeviceInfoDto deviceInfo;
}
