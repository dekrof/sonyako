package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.model.AddressDto;
import com.makeit.api.model.ProjectDto;
import com.makeit.api.model.TopProjectDto;
import com.makeit.api.model.UserDto;
import com.makeit.api.service.ProjectService;
import com.makeit.dao.model.Project;
import com.makeit.dao.model.UserProject;
import com.makeit.dao.model.UserProjectId;
import com.makeit.dao.repository.ProjectRepository;
import com.makeit.dao.repository.UserProjectRepository;
import com.makeit.dao.repository.UserRepository;
import lombok.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.List;
import java.util.function.Function;
import java.util.function.UnaryOperator;
import java.util.stream.Collectors;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class ProjectServiceImpl implements ProjectService {

    private final UserProjectRepository userProjectRepository;
    private final UserRepository userRepository;
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
    public ProjectDto saveOrUpdateProject(ProjectDto dto, Long userId) {
        var project = toEntity.andThen(repository::save).apply(dto);
        var user = objectMapper.convertValue(userRepository.getOne(userId), UserDto.class);

        var userProject = userProjectRepository.save(UserProject.builder()
            .id(UserProjectId.builder()
                .projectId(project.getId())
                .userId(user.getId())
                .build())
            .isUserCreator(true)
            .isUserOwner(true)
            .rating(4.0)
            .build()
        );

        return toDto.apply(project)
            .toBuilder()
            .owner(user)
            .build();
    }

    @Override
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
        List<UserProject> userProjects = userProjectRepository.findById_ProjectId(id);
        var user = userProjects.stream()
            .filter(UserProject::isUserOwner)
            .map(UserProject::getUser)
            .findFirst();

        var rating = userProjects.stream()
            .collect(Collectors.averagingDouble(UserProject::getRating));

        if (user.isPresent()) {
            var owner = objectMapper.convertValue(user.get(), UserDto.class);
            return repository.findById(id)
                .map(toDto)
                .map(dto -> dto.toBuilder()
                    .owner(owner)
                    .rating(rating)
                    .build())
                .orElse(null);
        }
        return null;
    }

    @Override
    public Page<ProjectDto> getProjects(Pageable pageable) {
        return repository.findAll(pageable)
            .map(toDto);
    }

    @Override
    public Page<ProjectDto> getProjectsByCategory(Pageable pageable, Long categoryId) {
        return userProjectRepository.getProjectsByCategory(pageable, categoryId)
            .map(userProject -> toDto.apply(userProject.getProject())
                .toBuilder()
                .owner(objectMapper.convertValue(userProject.getUser(), UserDto.class))
                .build()
            );
    }

    @Override
    public List<TopProjectDto> getLastTenProjects() {
        Function<UserProject, TopProjectDto> mapper = userProject -> {
            var project = userProject.getProject();
            var user = userProject.getUser();

            return objectMapper.convertValue(project, TopProjectDto.class)
                .toBuilder()
                .address(objectMapper.convertValue(user.getProfile().getAddress(), AddressDto.class))
                .owner(objectMapper.convertValue(user, UserDto.class))
                .build();
        };

        return userProjectRepository.getLastTenProjects()
            .map(mapper)
            .collect(Collectors.toList());
    }
}
