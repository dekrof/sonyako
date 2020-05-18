package com.makeit.api.serde;

import com.makeit.api.model.ProfileDto;
import com.makeit.dao.model.Profile;
import com.makeit.supported.serde.SimpleJsonModuleRegistrar;
import org.springframework.stereotype.Component;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Component
public class ProfileJsonRegistrar extends SimpleJsonModuleRegistrar<Profile, ProfileDto> {

    public ProfileJsonRegistrar() {
        super(Profile.class, ProfileDto.class);
    }
}
