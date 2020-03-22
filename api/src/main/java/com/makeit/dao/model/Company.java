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
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Entity
@Table(name = "COMPANY")
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(callSuper = true)
public class Company extends AbstractEntity {

    private static final long serialVersionUID = 7951382734495785152L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Company name should not be blank")
    private String name;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Company description should not be blank")
    private String description;

    @Column
    private String logo;

    @Valid
    @Column(name = "owner_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    private User owner;

}
