package com.makeit.api.service;

import com.makeit.api.model.SkillDto;
import com.makeit.api.model.TagDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface SkillService {

    @Transactional
    SkillDto saveOrUpdateSkill(SkillDto dto);

    @Transactional
    SkillDto deleteSkill(Long id);

    SkillDto getSkill(Long id);

    Page<SkillDto> getSkills(Pageable pageable);
}
