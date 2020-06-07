package com.makeit.api.controller;

import com.makeit.api.model.ApiResponse;
import com.makeit.api.model.ProjectDto;
import com.makeit.api.model.TagDto;
import com.makeit.api.service.ProjectService;
import com.makeit.api.service.TagService;
import com.makeit.dao.model.Project;
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
@RequestMapping("/api/project")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class ProjectController {

    private final ProjectService service;

    @PostMapping("/")
    public ApiResponse<ProjectDto> saveProject(@Valid @RequestBody ProjectDto dto) {
        if (dto == null) {
            return ApiResponse.<ProjectDto>error()
                .cause("project.should.not.be.null")
                .build();
        }

        if (dto.getId() != null) {
            return ApiResponse.<ProjectDto>error()
                .cause("project.should.not.be.saved.before")
                .build();
        }

        try {
            return ApiResponse.<ProjectDto>data()
                .data(service.saveOrUpdateProject(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to save project", ex);
            return ApiResponse.<ProjectDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @PutMapping("/")
    public ApiResponse<ProjectDto> updateProject(@Valid @RequestBody ProjectDto dto) {
        if (dto == null) {
            return ApiResponse.<ProjectDto>error()
                .cause("project.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<ProjectDto>data()
                .data(service.saveOrUpdateProject(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to update project", ex);
            return ApiResponse.<ProjectDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<ProjectDto> deleteProject(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<ProjectDto>error()
                .cause("project.id.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<ProjectDto>data()
                .data(service.deleteProject(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to delete project", ex);
            return ApiResponse.<ProjectDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<ProjectDto> getProject(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<ProjectDto>error()
                .cause("project.id.should.not.be.null")
                .build();
        }

        try {
            return ApiResponse.<ProjectDto>data()
                .data(service.getProject(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get project", ex);
            return ApiResponse.<ProjectDto>data()
                .data(null)
                .build();
        }
    }

    @GetMapping("/")
    public ApiResponse<Page<ProjectDto>> getProjects(@NotNull Pageable pageable) {
        try {
            return ApiResponse.<Page<ProjectDto>>data()
                .data(service.getProjects(pageable))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get projects", ex);
            return ApiResponse.<Page<ProjectDto>>data()
                .data(Page.empty())
                .build();
        }
    }
}
