package com.makeit.api.model;

import com.makeit.dao.model.Profile;
import com.makeit.supported.validation.NullOrNotBlank;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.validation.constraints.NotNull;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@ApiModel(value = "Registration Request", description = "The registration request payload")
public class RegistrationDto {

    @NullOrNotBlank(message = "Registration username can be null but not blank")
    @ApiModelProperty(
        value = "A valid username",
        allowableValues = "NonEmpty String"
    )
    private String username;

    @NullOrNotBlank(message = "Registration email can be null but not blank")
    @ApiModelProperty(
        value = "A valid email",
        required = true,
        allowableValues = "NonEmpty String"
    )
    private String email;

    @NotNull(message = "Registration password should not be null")
    @ApiModelProperty(
        value = "A valid password string",
        required = true,
        allowableValues = "NonEmpty String"
    )
    private String password;

    @NotNull(message = "Profile should not be null")
    @ApiModelProperty(
        value = "Profile of new registered user",
        required = true
    )
    private Profile profile;

    @ApiModelProperty(
        value = "Flag denoting whether the user is an admin or not", required = true,
        dataType = "boolean",
        allowableValues = "true, false"
    )
    private boolean registerAsAdmin;

    @ApiModelProperty(
        value = "Flag denoting whether the user is a freelancer or not", required = true,
        dataType = "boolean",
        allowableValues = "true, false"
    )
    private boolean registerAsFreelancer;

    @ApiModelProperty(
        value = "Flag denoting whether the user is an owner or not", required = true,
        dataType = "boolean",
        allowableValues = "true, false"
    )
    private boolean registerAsOwner;
}
