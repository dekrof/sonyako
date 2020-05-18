package com.makeit.api.model;

import com.makeit.dao.model.DeviceType;
import com.makeit.supported.validation.NullOrNotBlank;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

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
public class DeviceInfoDto {

    @NotBlank(message = "Device id cannot be blank")
    @ApiModelProperty(
        value = "Device Id",
        required = true,
        allowableValues = "Non empty string"
    )
    private String deviceId;

    @NotNull(message = "Device type cannot be null")
    @ApiModelProperty(
        value = "Device type Android/iOS",
        required = true
    )
    private DeviceType deviceType;

    @NullOrNotBlank(message = "Device notification token can be null but not blank")
    @ApiModelProperty(
        value = "Device notification id",
        allowableValues = "Non empty string"
    )
    private String notificationToken;
}
