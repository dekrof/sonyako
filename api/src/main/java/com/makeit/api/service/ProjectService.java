package com.makeit.api.service;

import com.makeit.api.model.ProjectDto;
import com.makeit.api.model.TagDto;
import com.makeit.dao.model.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface ProjectService {

    @Transactional
    ProjectDto saveOrUpdateProject(ProjectDto dto);

    @Transactional
    ProjectDto deleteProject(Long id);

    ProjectDto getProject(Long id);

    Page<ProjectDto> getProjects(Pageable pageable);
}
