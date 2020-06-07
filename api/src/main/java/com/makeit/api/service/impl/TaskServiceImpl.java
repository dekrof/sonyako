package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.model.TagDto;
import com.makeit.api.model.TaskDto;
import com.makeit.api.service.TaskService;
import com.makeit.dao.model.Tag;
import com.makeit.dao.model.Task;
import com.makeit.dao.repository.TagRepository;
import com.makeit.dao.repository.TaskRepository;
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
public class TaskServiceImpl implements TaskService {

    private final TaskRepository repository;
    private final ObjectMapper objectMapper;

    private Function<Task, TaskDto> toDto;
    private Function<TaskDto, Task> toEntity;

    @PostConstruct
    public void initialize() {
        toDto = (entity) -> objectMapper.convertValue(entity, TaskDto.class);
        toEntity = (dto) -> objectMapper.convertValue(dto, Task.class);
    }

    @Override
    @Transactional
    public TaskDto saveOrUpdateTask(TaskDto dto) {
        return toEntity
            .andThen(repository::save)
            .andThen(toDto)
            .apply(dto);
    }

    @Override
    @Transactional
    public TaskDto deleteTask(Long id) {
        UnaryOperator<Task> mapper = task -> {
            repository.delete(task);
            return task;
        };

        return repository.findById(id)
            .map(mapper)
            .map(task -> task.toBuilder().id(null).build())
            .map(toDto)
            .orElseThrow(() -> new IllegalArgumentException("Task not found"));
    }

    @Override
    public TaskDto getTask(Long id) {
        return repository.findById(id).map(toDto).orElse(null);
    }

    @Override
    public Page<TaskDto> getTasks(Pageable pageable) {
        return repository.findAll(pageable).map(toDto);
    }
}
