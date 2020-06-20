package com.makeit.dao.model;

import lombok.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
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
@Entity
@Table(name = "USER_PROJECT")
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class UserProject implements Serializable {

    private static final long serialVersionUID = 5756765817964913492L;

    @EmbeddedId
    private UserProjectId id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @MapsId("user_id")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @MapsId("project_id")
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "rating", nullable = false)
    private double rating;

    @Column(name = "status")
    @Enumerated(value = EnumType.ORDINAL)
    private UserStatusType userStatus;

    @Column(name = "is_user_creator", nullable = false)
    private boolean isUserCreator;

    @Column(name = "is_user_owner", nullable = false)
    private boolean isUserOwner;
}
