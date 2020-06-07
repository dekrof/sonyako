package com.makeit.api.service;

import com.makeit.api.model.TagDto;
import com.makeit.api.model.TaskDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface TaskService {

    @Transactional
    TaskDto saveOrUpdateTask(TaskDto dto);

    @Transactional
    TaskDto deleteTask(Long id);

    TaskDto getTask(Long id);

    Page<TaskDto> getTasks(Pageable pageable);
}
