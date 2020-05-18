package com.makeit.api.serde;

import com.makeit.api.model.AddressDto;
import com.makeit.dao.model.Address;
import com.makeit.supported.serde.SimpleJsonModuleRegistrar;
import org.springframework.stereotype.Component;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Component
public class AddressJsonRegistrar extends SimpleJsonModuleRegistrar<Address, AddressDto> {

    public AddressJsonRegistrar() {
        super(Address.class, AddressDto.class);
    }
}
