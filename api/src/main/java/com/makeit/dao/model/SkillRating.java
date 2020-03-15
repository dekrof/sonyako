package com.makeit.dao.model;

import lombok.*;

import javax.persistence.*;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Entity(name = "USER_SKILL")
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SkillRating {

    @EmbeddedId
    SkillRatingId id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @MapsId("user_id")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @MapsId("skill_id")
    @JoinColumn(name = "skill_id")
    private Skill skill;

    double rating;
}
