package com.makeit.dao.model;

import lombok.*;
import lombok.experimental.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Entity
@Table(name = "CATEGORY")
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Category implements Serializable {

    private static final long serialVersionUID = 7951382734495785152L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    @NotBlank(message = "Category name should not be blank")
    private String name;

    @Column(nullable = false)
    @NotBlank(message = "Category descriptin should not be blank")
    private String description;

}
