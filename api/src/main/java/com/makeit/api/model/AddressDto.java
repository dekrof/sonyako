package com.makeit.api.model;

import com.makeit.dao.model.CityType;
import com.makeit.dao.model.StreetType;
import lombok.*;

import java.io.Serializable;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder(toBuilder = true)
public class AddressDto implements Serializable {

    private static final long serialVersionUID = -1691922161867206859L;

    private Long id;
    private String countryCode;
    private String region;
    private String district;
    private String city;
    private CityType cityType;
    private String street;
    private StreetType streetType;
    private String houseNumber;
    private String postalCode;
}
