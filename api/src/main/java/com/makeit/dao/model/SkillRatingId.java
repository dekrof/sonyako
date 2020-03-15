package com.makeit.dao.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Embeddable
public class SkillRatingId implements Serializable {

    private static final long serialVersionUID = 5756765817964913492L;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "skill_id", nullable = false)
    private Long skillId;

}


