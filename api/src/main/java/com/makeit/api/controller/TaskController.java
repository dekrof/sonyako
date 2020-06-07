package com.makeit.api.controller;

import com.makeit.api.model.ApiResponse;
import com.makeit.api.model.TagDto;
import com.makeit.api.model.TaskDto;
import com.makeit.api.service.TagService;
import com.makeit.api.service.TaskService;
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
@RequestMapping("/api/task")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class TaskController {

    private final TaskService service;

    @PostMapping("/")
    public ApiResponse<TaskDto> saveTask(@Valid @RequestBody TaskDto dto) {
        if (dto == null) {
            return ApiResponse.<TaskDto>error()
                .cause("task.should.not.be.null")
                .build();
        }

        if (dto.getId() != null) {
            return ApiResponse.<TaskDto>error()
                .cause("task.should.not.be.saved.before")
                .build();
        }

        try {
            return ApiResponse.<TaskDto>data()
                .data(service.saveOrUpdateTask(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to save task", ex);
            return ApiResponse.<TaskDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @PutMapping("/")
    public ApiResponse<TaskDto> updateTask(@Valid @RequestBody TaskDto dto) {
        if (dto == null) {
            return ApiResponse.<TaskDto>error()
                .cause("task.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<TaskDto>data()
                .data(service.saveOrUpdateTask(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to update task", ex);
            return ApiResponse.<TaskDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<TaskDto> deleteTask(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<TaskDto>error()
                .cause("task.id.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<TaskDto>data()
                .data(service.deleteTask(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to delete task", ex);
            return ApiResponse.<TaskDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<TaskDto> getTask(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<TaskDto>error()
                .cause("task.id.should.not.be.null")
                .build();
        }

        try {
            return ApiResponse.<TaskDto>data()
                .data(service.getTask(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get task", ex);
            return ApiResponse.<TaskDto>data()
                .data(null)
                .build();
        }
    }

    @GetMapping("/")
    public ApiResponse<Page<TaskDto>> getTasks(@NotNull Pageable pageable) {
        try {
            return ApiResponse.<Page<TaskDto>>data()
                .data(service.getTasks(pageable))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get tasks", ex);
            return ApiResponse.<Page<TaskDto>>data()
                .data(Page.empty())
                .build();
        }
    }
}
