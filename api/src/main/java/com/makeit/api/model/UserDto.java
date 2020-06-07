package com.makeit.api.model;

import com.makeit.dao.model.Profile;
import io.swagger.annotations.ApiModel;
import lombok.*;
import lombok.experimental.*;

import javax.persistence.Entity;
import javax.persistence.Table;

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
public class UserDto {

    private Long id;
    private String username;
    private BaseProfileDto profile;
}
