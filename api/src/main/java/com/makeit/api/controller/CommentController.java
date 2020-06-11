package com.makeit.api.controller;

import com.makeit.api.model.ApiResponse;
import com.makeit.api.model.CommentDto;
import com.makeit.api.model.ProjectDto;
import com.makeit.api.service.CommentService;
import com.makeit.api.service.ProjectService;
import com.makeit.dao.model.Comment;
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
@RequestMapping("/api/comment")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class CommentController {

    private final CommentService service;

    @PostMapping("/")
    public ApiResponse<CommentDto> saveComment(@Valid @RequestBody CommentDto dto) {
        if (dto == null) {
            return ApiResponse.<CommentDto>error()
                .cause("comment.should.not.be.null")
                .build();
        }

        if (dto.getId() != null) {
            return ApiResponse.<CommentDto>error()
                .cause("comment.should.not.be.saved.before")
                .build();
        }

        try {
            return ApiResponse.<CommentDto>data()
                .data(service.saveOrUpdateComment(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to save comment", ex);
            return ApiResponse.<CommentDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @PutMapping("/")
    public ApiResponse<CommentDto> updateComment(@Valid @RequestBody CommentDto dto) {
        if (dto == null) {
            return ApiResponse.<CommentDto>error()
                .cause("comment.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<CommentDto>data()
                .data(service.saveOrUpdateComment(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to update comment", ex);
            return ApiResponse.<CommentDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<CommentDto> deleteComment(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<CommentDto>error()
                .cause("comment.id.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<CommentDto>data()
                .data(service.deleteComment(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to delete comment", ex);
            return ApiResponse.<CommentDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<CommentDto> getComment(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<CommentDto>error()
                .cause("comment.id.should.not.be.null")
                .build();
        }

        try {
            return ApiResponse.<CommentDto>data()
                .data(service.getComment(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get comment", ex);
            return ApiResponse.<CommentDto>data()
                .data(null)
                .build();
        }
    }

    @GetMapping("/")
    public ApiResponse<Page<CommentDto>> getComments(@NotNull Pageable pageable) {
        try {
            return ApiResponse.<Page<CommentDto>>data()
                .data(service.getComments(pageable))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get comments", ex);
            return ApiResponse.<Page<CommentDto>>data()
                .data(Page.empty())
                .build();
        }
    }
}
