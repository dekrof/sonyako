package com.makeit.api.controller;

import com.makeit.api.model.ApiResponse;
import com.makeit.api.model.CommentDto;
import com.makeit.api.service.CommentService;
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

import javax.annotation.security.RolesAllowed;
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

    @PostMapping("")
    @RolesAllowed({"ROLE_OWNER", "ROLE_FREELANCER", "ROLE_ADMIN"})
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

    @PutMapping("")
    @RolesAllowed({"ROLE_OWNER", "ROLE_FREELANCER", "ROLE_ADMIN"})
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

    @DeleteMapping("/of/project/{projectId}/{id}")
    @RolesAllowed({"ROLE_OWNER", "ROLE_FREELANCER", "ROLE_ADMIN"})
    public ApiResponse<CommentDto> deleteComment(@PathVariable("projectId") Long projectId, @PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<CommentDto>error()
                .cause("comment.id.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<CommentDto>data()
                .data(service.deleteProjectComment(projectId, id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to delete comment", ex);
            return ApiResponse.<CommentDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @DeleteMapping("/of/user/{userId}/{id}")
    @RolesAllowed({"ROLE_OWNER", "ROLE_FREELANCER", "ROLE_ADMIN"})
    public ApiResponse<CommentDto> deleteUserComment(@PathVariable("userId") Long userId, @PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<CommentDto>error()
                .cause("comment.id.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<CommentDto>data()
                .data(service.deleteUserComment(userId, id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to delete comment", ex);
            return ApiResponse.<CommentDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @GetMapping("/{id}")
    @RolesAllowed({"ROLE_OWNER", "ROLE_FREELANCER", "ROLE_ADMIN"})
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

    @GetMapping("")
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

    @GetMapping("/of/project/{id}")
    public ApiResponse<Page<CommentDto>> getProjectComments(@NotNull Pageable pageable, @PathVariable("id") Long id) {
        try {
            return ApiResponse.<Page<CommentDto>>data()
                .data(service.getProjectComments(pageable, id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get comments", ex);
            return ApiResponse.<Page<CommentDto>>data()
                .data(Page.empty())
                .build();
        }
    }

    @GetMapping("/of/user/{id}")
    public ApiResponse<Page<CommentDto>> getUserComments(@NotNull Pageable pageable, @PathVariable("id") Long id) {
        try {
            return ApiResponse.<Page<CommentDto>>data()
                .data(service.getUserComments(pageable, id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get comments", ex);
            return ApiResponse.<Page<CommentDto>>data()
                .data(Page.empty())
                .build();
        }
    }
}
