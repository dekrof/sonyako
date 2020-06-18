package com.makeit.api.model;

import lombok.*;

import java.time.Instant;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder(toBuilder = true)
public class TopProjectDto {
    private Long id;
    private String name;
    private String logo;
    private UserDto owner;
    private String description;
    private AddressDto address;
    private double ratePerHour;
    private String rateCurrency;
    private Long minDuration;
    private Long maxDuration;
    private Integer proposals;
    private Instant createdAt;
}
