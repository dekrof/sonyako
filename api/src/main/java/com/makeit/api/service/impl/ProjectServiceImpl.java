package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.model.ProjectDto;
import com.makeit.api.model.TagDto;
import com.makeit.api.service.ProjectService;
import com.makeit.dao.model.Project;
import com.makeit.dao.model.Tag;
import com.makeit.dao.repository.ProjectRepository;
import com.makeit.dao.repository.TagRepository;
import lombok.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.function.Function;
import java.util.function.UnaryOperator;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class ProjectServiceImpl implements ProjectService {

    private final ProjectRepository repository;
    private final ObjectMapper objectMapper;

    private Function<Project, ProjectDto> toDto;
    private Function<ProjectDto, Project> toEntity;

    @PostConstruct
    public void initialize() {
        toDto = (entity) -> objectMapper.convertValue(entity, ProjectDto.class);
        toEntity = (dto) -> objectMapper.convertValue(dto, Project.class);
    }

    @Override
    @Transactional
    public ProjectDto saveOrUpdateProject(ProjectDto dto) {
        return toEntity
            .andThen(repository::save)
            .andThen(toDto)
            .apply(dto);
    }

    @Override
    @Transactional
    public ProjectDto deleteProject(Long id) {
        UnaryOperator<Project> mapper = project -> {
            repository.delete(project);
            return project;
        };

        return repository.findById(id)
            .map(mapper)
            .map(project -> project.toBuilder().id(null).build())
            .map(toDto)
            .orElseThrow(() -> new IllegalArgumentException("Project not found"));
    }

    @Override
    public ProjectDto getProject(Long id) {
        return repository.findById(id).map(toDto).orElse(null);
    }

    @Override
    public Page<ProjectDto> getProjects(Pageable pageable) {
        return repository.findAll(pageable).map(toDto);
    }
}
