package com.makeit.api.service;

import com.makeit.api.model.ProjectDto;
import com.makeit.api.model.TopProjectDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface ProjectService {

    ProjectDto saveOrUpdateProject(ProjectDto dto, Long userId);

    ProjectDto deleteProject(Long id);

    ProjectDto getProject(Long id);

    Page<ProjectDto> getProjects(Pageable pageable);

    Page<ProjectDto> getProjectsByCategory(Pageable pageable, Long categoryId);

    List<TopProjectDto> getLastTenProjects();
}
