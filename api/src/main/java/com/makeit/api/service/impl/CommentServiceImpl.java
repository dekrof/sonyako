package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.model.CommentDto;
import com.makeit.api.model.TaskDto;
import com.makeit.api.service.CommentService;
import com.makeit.dao.model.Comment;
import com.makeit.dao.model.Task;
import com.makeit.dao.repository.CommentRepository;
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
public class CommentServiceImpl implements CommentService {

    private final CommentRepository repository;
    private final ObjectMapper objectMapper;

    private Function<Comment, CommentDto> toDto;
    private Function<CommentDto, Comment> toEntity;

    @PostConstruct
    public void initialize() {
        toDto = (entity) -> objectMapper.convertValue(entity, CommentDto.class);
        toEntity = (dto) -> objectMapper.convertValue(dto, Comment.class);
    }

    @Override
    @Transactional
    public CommentDto saveOrUpdateComment(CommentDto dto) {
        return toEntity
            .andThen(repository::save)
            .andThen(toDto)
            .apply(dto);
    }

    @Override
    @Transactional
    public CommentDto deleteComment(Long id) {
        UnaryOperator<Comment> mapper = comment -> {
            repository.delete(comment);
            return comment;
        };

        return repository.findById(id)
            .map(mapper)
            .map(comment -> comment.toBuilder().id(null).build())
            .map(toDto)
            .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
    }

    @Override
    public CommentDto getComment(Long id) {
        return repository.findById(id).map(toDto).orElse(null);
    }

    @Override
    public Page<CommentDto> getComments(Pageable pageable) {
        return repository.findAll(pageable).map(toDto);
    }
}
