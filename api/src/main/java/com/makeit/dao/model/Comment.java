package com.makeit.dao.model;

import lombok.*;
import lombok.experimental.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.Comparator;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Entity
@Table(name = "COMMENT")
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(callSuper = true)
public class Comment extends AbstractEntity implements Comparable<Comment> {

    private static final long serialVersionUID = 7951382734495785152L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Valid
    @JoinColumn(name = "commentator_id", nullable = false)
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    private User commentator;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description", nullable = false)
    @NotBlank(message = "Comment description should not be blank")
    private String description;

    @Valid
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_comment_id")
    private Comment parent;

    @Enumerated(EnumType.ORDINAL)
    @Column(name = "related_to", nullable = false)
    private CommentType type;

    @Override
    public int compareTo(Comment other) {
        if (other == null || other.getId() == null) {
            return -1;
        }
        return Comparator.comparing(Comment::getId).compare(this, other);
    }
}
