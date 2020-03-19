package com.makeit.dao.model;

import com.makeit.validation.NullOrNotBlank;
import lombok.*;
import lombok.experimental.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

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
public class Comment extends AbstractEntity {

    private static final long serialVersionUID = 7951382734495785152L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long commentator_id;

    @Column(nullable = false)
    private Long parent_comment_id;

    @Column(nullable = false)
    @NullOrNotBlank(message = "Comment text should not be blank")
    private String comment_text;

    @Column
    private String comment_col;

    @ManyToMany(mappedBy = "comments", fetch = FetchType.LAZY)
    private Set<User> users = Set.of();

}
