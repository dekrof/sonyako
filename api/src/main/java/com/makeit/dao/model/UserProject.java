package com.makeit.dao.model;

import lombok.*;
import lombok.experimental.*;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;
import java.io.Serializable;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Entity(name = "USER_PROJECT")
@Table(name = "USER_PROJECT")
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class UserProject implements Serializable {

    private static final long serialVersionUID = 5756765817964913492L;

    @EmbeddedId
    private UserProjectId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("project_id")
    private Project project;

    @Column(name = "rating", nullable = false)
    private double rating;

    @Column(name = "is_user_creator", nullable = false)
    private boolean isUserCreator;

    @Column(name = "is_user_owner", nullable = false)
    private boolean isUserOwner;
}
