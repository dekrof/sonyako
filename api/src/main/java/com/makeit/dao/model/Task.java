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
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;
import java.util.Set;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Entity
@Table(name = "TASK")
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(callSuper = true)
public class Task extends AbstractEntity {

    private static final long serialVersionUID = 7951382734495785152L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    @NotBlank(message = "Task name shoud not be  blank")
    private String name;

    @Column(name = "description", nullable = false)
    @NotBlank(message = "Task description should not be blank ")
    private String description;

    @Column(name = "complexity", nullable = false)
    @NotBlank(message = "Task complexity should not be blank")
    private Long complexity;

    @Column(name = "duration", nullable = false)
    @NotBlank(message = "Task duration shold not be blank ")
    private Long duration;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "parent_task_id")
    private Long parentTaskId;

    @Column(name = "progress_status", nullable = false)
    private Long progressStatus;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "stated_at")
    private LocalDateTime statedAt;

    @Column(name = "is_overdone", nullable = false)
    private boolean isOverdone;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<User> users = Set.of();

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<Tag> tags = Set.of();
}
