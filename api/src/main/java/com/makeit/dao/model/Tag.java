package com.makeit.dao.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.Objects;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Entity
@Table(name = "TAG")
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Tag implements Serializable {

    private static final long serialVersionUID = -6798308330040809876L;

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    @NotEmpty(message = "Name should not be blank")
    private String name;

    @Column(name = "description", nullable = false)
    @NotBlank(message = "Description should not be null")
    private String description;

    @Column(name = "category_id", nullable = false, insertable = false, updatable = false)
    private Long categoryId;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof Tag)) {
            return false;
        }
        var tag = (Tag) obj;
        return Objects.equals(id, tag.id)
            && Objects.equals(name, tag.name)
            && Objects.equals(description, tag.description)
            && Objects.equals(categoryId, tag.categoryId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, description, categoryId);
    }
}
