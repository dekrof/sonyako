package com.makeit.api.serde;

import com.makeit.api.model.FullProfileDto;
import com.makeit.dao.model.Profile;
import com.makeit.supported.serde.SimpleJsonModuleRegistrar;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public class FullProfileJsonRegistrar extends SimpleJsonModuleRegistrar<Profile, FullProfileDto> {

    public FullProfileJsonRegistrar() {
        super(Profile.class, FullProfileDto.class);
    }
}
