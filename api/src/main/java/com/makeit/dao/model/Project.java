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
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.Objects;
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
public class Project extends AbstractEntity {

    private static final long serialVersionUID = 7951382734495785152L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    @NotBlank(message = "Project name should not be blank")
    private String name;

    @Column(name = "logo")
    private String logo;

    @Column(name = "description", nullable = false)
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
    @Positive(message = "Rate per hour should not be less than zero")
    private double ratePerHour;

    @Column(name = "rate_currency", nullable = false)
    @NotBlank(message = "Rate currency should not be blank")
    private String rateCurrency;

    @Column(name = "min_duration", nullable = false)
    @PositiveOrZero(message = "Minimal duration should not be less than zero")
    private Long minDuration;

    @Column(name = "max_duration", nullable = false)
    @Positive(message = "Maximum duration should not be zero")
    private Long maxDuration;

    @Column(name = "required_level")
    @Positive(message = "Required level should not be zero")
    private Integer requiredLevel;

    @Column(name = "level_of_efforts")
    @Positive(message = "LOE should not be zero")
    private Integer loe;

    @Column(name = "proposals", nullable = false)
    @Positive(message = "The number of proposals should be greater than zero")
    private Integer proposals;

    @Column(name = "is_active")
    private boolean active;

    @Valid
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "PROJECT_TAG",
        joinColumns = @JoinColumn(name = "project_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id")
    )
    private Set<Tag> tags = Set.of();

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof Project)) {
            return false;
        }

        var project = (Project) obj;
        return fixedRate == project.fixedRate
            && fixedTime == project.fixedTime
            && Double.compare(project.ratePerHour, ratePerHour) == 0
            && id.equals(project.id)
            && name.equals(project.name)
            && description.equals(project.description)
            && Objects.equals(rateCurrency, project.rateCurrency)
            && Objects.equals(minDuration, project.minDuration)
            && Objects.equals(maxDuration, project.maxDuration);
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id, name, description,
            fixedRate, fixedTime, ratePerHour,
            rateCurrency, minDuration, maxDuration
        );
    }
}
