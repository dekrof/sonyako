package com.makeit.api.controller;

import com.makeit.api.model.ApiResponse;
import com.makeit.api.model.RoleDto;
import com.makeit.api.model.SkillDto;
import com.makeit.api.service.RoleService;
import com.makeit.api.service.SkillService;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@RestController
@RequestMapping("/api/skill")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class SkillController {

    private final SkillService service;

    @PostMapping("/")
    public ApiResponse<SkillDto> saveSkill(@Valid @RequestBody SkillDto dto) {
        if (dto == null) {
            return ApiResponse.<SkillDto>error()
                .cause("skill.should.not.be.null")
                .build();
        }

        if (dto.getId() != null) {
            return ApiResponse.<SkillDto>error()
                .cause("skill.should.not.be.saved.before")
                .build();
        }

        try {
            return ApiResponse.<SkillDto>data()
                .data(service.saveOrUpdateSkill(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to save skill", ex);
            return ApiResponse.<SkillDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @PutMapping("/")
    public ApiResponse<SkillDto> updateSkill(@Valid @RequestBody SkillDto dto) {
        if (dto == null) {
            return ApiResponse.<SkillDto>error()
                .cause("skill.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<SkillDto>data()
                .data(service.saveOrUpdateSkill(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to update skill", ex);
            return ApiResponse.<SkillDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<SkillDto> deleteSkill(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<SkillDto>error()
                .cause("skill.id.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<SkillDto>data()
                .data(service.deleteSkill(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to delete skill", ex);
            return ApiResponse.<SkillDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<SkillDto> getSkill(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<SkillDto>error()
                .cause("skill.id.should.not.be.null")
                .build();
        }

        try {
            return ApiResponse.<SkillDto>data()
                .data(service.getSkill(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get skill", ex);
            return ApiResponse.<SkillDto>data()
                .data(null)
                .build();
        }
    }

    @GetMapping("/")
    public ApiResponse<Page<SkillDto>> getSkills(@NotNull Pageable pageable) {
        try {
            return ApiResponse.<Page<SkillDto>>data()
                .data(service.getSkills(pageable))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get skills", ex);
            return ApiResponse.<Page<SkillDto>>data()
                .data(Page.empty())
                .build();
        }
    }
}
