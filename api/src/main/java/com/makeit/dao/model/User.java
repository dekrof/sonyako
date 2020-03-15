package com.makeit.dao.model;

import com.makeit.validation.NullOrNotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Entity
@Table(name = "USER")
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(callSuper = true)
public class User extends AbstractEntity {

    private static final long serialVersionUID = 7951382734495785152L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NullOrNotBlank(message = "Username should not be blank")
    private String username;

    @Column
    @NotNull(message = "Password should not be null")
    private String password;

    @Builder.Default
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "USER_AUTHORITY",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id")
    )
    private Set<Role> roles = Set.of();

    @Singular
    @OneToMany(mappedBy = "skill", fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<SkillRating> raredSkills = Set.of();

    @Singular
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Tag> usertag = Set.of();

    @Valid
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private Profile profile;

    @Column(name = "is_active", nullable = false)
    private boolean active;

    @Column(name = "is_email_verified", nullable = false)
    private boolean emailVerified;

    public void addRole(Role role) {
        roles.add(role);
        role.getUsers().add(this);
    }

    public void addRoles(Set<Role> roles) {
        roles.forEach(this::addRole);
    }

    public void removeRole(Role role) {
        roles.remove(role);
        role.getUsers().remove(this);
    }
}
