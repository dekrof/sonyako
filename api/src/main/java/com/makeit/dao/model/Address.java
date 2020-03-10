package com.makeit.dao.model;

import lombok.*;
import lombok.experimental.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Entity
@Table(name = "ADDRESS")
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(callSuper = true)
public class Address extends AbstractEntity {

    private static final long serialVersionUID = 4495936477436078501L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Country code should not be null")
    @Column(name = "country", nullable = false)
    private String countryCode;

    @Column(nullable = false)
    @NotNull(message = "The country region should not be null")
    private String region;

    @Column
    private String district;

    @Column(nullable = false)
    @NotNull(message = "City should not be null")
    private String city;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "city_type", nullable = false)
    @NotNull(message = "City type should not be null")
    private CityType cityType;

    @Column(nullable = false)
    @NotNull(message = "Street should not be null")
    private String street;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "street_type", nullable = false)
    @NotNull(message = "Street type should not be null")
    private StreetType streetType;

    @Column(name = "house_number", nullable = false)
    @NotNull(message = "The house number should not be null")
    private String houseNumber;

    @Column(name = "postal_code", nullable = false)
    @NotNull(message = "The house number should not be null")
    @Pattern(regexp = "\\d+", message = "Only digits are applicable")
    private String postalCode;
}
