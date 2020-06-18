package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.model.CommentDto;
import com.makeit.api.service.CommentService;
import com.makeit.dao.model.Comment;
import com.makeit.dao.model.CommentType;
import com.makeit.dao.model.ProjectComment;
import com.makeit.dao.model.ProjectCommentId;
import com.makeit.dao.repository.CommentRepository;
import com.makeit.dao.repository.ProjectCommentRepository;
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
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class CommentServiceImpl implements CommentService {

    private final ProjectCommentRepository projectCommentRepository;
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
    public CommentDto saveOrUpdateComment(CommentDto dto) {
        var saved = toEntity
            .andThen(repository::save)
            .andThen(toDto)
            .apply(dto);

        if (dto.getType() == CommentType.PROJECT) {
            var projectComment = ProjectComment.builder()
                .id(ProjectCommentId.builder()
                    .commentId(saved.getId())
                    .projectId(dto.getBelongTo())
                    .build())
                .build();
            projectCommentRepository.save(projectComment);
        }

        return saved.toBuilder()
            .belongTo(dto.getBelongTo())
            .build();
    }

    @Override
    public CommentDto deleteProjectComment(Long projectId, Long id) {
        return deleteComment(CommentType.PROJECT, projectId, id);
    }

    @Override
    public CommentDto deleteComment(CommentType commentType, Long entityId, Long commentId) {
        var saved = repository.findById(commentId);

        if (saved.isPresent() && commentType == CommentType.PROJECT) {
            var id = ProjectCommentId.builder()
                .commentId(commentId)
                .projectId(entityId)
                .build();

            projectCommentRepository.deleteById(id);
        }

        UnaryOperator<Comment> mapper = comment -> {
            repository.delete(comment);
            return comment;
        };

        return saved
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

    @Override
    public Page<CommentDto> getProjectComments(Pageable pageable, Long projectId) {
        return projectCommentRepository.findById_ProjectId(projectId, pageable)
            .map(ProjectComment::getComment)
            .map(toDto);
    }
}
