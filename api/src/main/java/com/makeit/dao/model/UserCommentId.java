package com.makeit.dao.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Embeddable
public class UserCommentId implements Serializable {

    private static final long serialVersionUID = 5756765817964913492L;

    @Column(name = "user_id", nullable = false)
    private Long taskId;

    @Column(name = "comment_id", nullable = false)
    private Long commentId;
}
