package com.makeit.api.service;

import com.makeit.api.model.SkillDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */

public interface SkillService {

    List<SkillDto> saveSkills(List<SkillDto> dtos);

    SkillDto saveOrUpdateSkill(SkillDto dto);

    SkillDto deleteSkill(Long id);

    SkillDto getSkill(Long id);

    Page<SkillDto> getSkills(Pageable pageable);
}
