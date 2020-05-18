package com.makeit.dao.model;

import lombok.*;
import lombok.experimental.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.Set;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Entity
@Table(name = "PROJECT")
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(callSuper = true)
public class Project extends AbstractEntity {

    private static final long serialVersionUID = 7951382734495785152L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Project name should not be blank")
    private String name;

    @Column(nullable = false)
    @NotBlank(message = "Project description should not be blank")
    private String description;

    @Valid
    @JoinColumn(name = "company_id")
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    private Company company;

    @JoinColumn(name = "category_id")
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    private Category category;

    @Column(name = "is_fixed_rate", nullable = false)
    private boolean fixedRate;

    @Column(name = "is_fixed_time", nullable = false)
    private boolean fixedTime;

    @Column(name = "rate_per_hour", nullable = false)
    @NotBlank(message = "Rate per hour should not be blank")
    private double ratePerHour;

    @Column(name = "rate_currency", nullable = false)
    @NotBlank(message = "Rate currency should not be blank")
    private String rateCurrency;

    @Column(name = "min_duration", nullable = false)
    @NotBlank(message = "Minimal duration should not be blank")
    private Long minDuration;

    @Column(name = "max_duration", nullable = false)
    @NotBlank(message = "Maximum duration should not be blank")
    private Long maxDuration;

    @Valid
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "PROJECT_TAG",
        joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id")
    )
    private Set<Tag> tags = Set.of();
}
