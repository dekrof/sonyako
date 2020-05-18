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
public class TokenRefreshDto {

    @NotBlank(message = "Refresh token cannot be blank")
    @ApiModelProperty(
        value = "Valid refresh token passed during earlier successful authentications",
        required = true,
        allowableValues = "Non empty string")
    private String refreshToken;
}
