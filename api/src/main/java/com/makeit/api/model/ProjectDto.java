package com.makeit.api.model;

import lombok.*;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder(toBuilder = true)
public class ProjectDto {

    private Long id;
    private String name;
    private String description;
    private CompanyDto company;
    private CategoryDto category;
    private boolean fixedRate;
    private boolean fixedTime;
    private double ratePerHour;
    private String rateCurrency;
    private Long minDuration;
    private Long maxDuration;
}
