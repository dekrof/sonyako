package com.makeit.dao.model;

import com.makeit.validation.NullOrNotBlank;
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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
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
    @JoinTable(
        name = "USER_TAG",
        joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id", referencedColumnName = "id")
    )
    private Set<Tag> tags = Set.of();

    @Singular
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Task> tasks = Set.of();

    @Singular
    @OneToMany(mappedBy = "commentator", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<@Valid Comment> comments = Set.of();

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

    public void addTag(Tag tag) {
        tags.add(tag);
        tag.getUsers().add(this);
    }

    public void addTags(Set<Tag> tags) {
        tags.forEach(this::addTag);
    }

    public void removeTag(Tag tag) {
        tags.remove(tag);
        tag.getUsers().remove(this);
    }

    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setCommentator(this);
    }

    public void addComments(Set<Comment> comments) {
        comments.forEach(this::addComment);
    }

    public void removeComment(Comment comment) {
        comments.remove(comment);
        comment.setCommentator(null);
    }
}
