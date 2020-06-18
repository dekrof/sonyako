package com.makeit.api.service;

import com.makeit.api.model.CommentDto;
import com.makeit.dao.model.CommentType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface CommentService {

    CommentDto saveOrUpdateComment(CommentDto dto);

    CommentDto deleteUserComment(Long projectId, Long id);

    CommentDto deleteComment(CommentType commentType, Long entityId, Long id);

    CommentDto getComment(Long id);

    Page<CommentDto> getComments(Pageable pageable);

    CommentDto deleteProjectComment(Long projectId, Long id);

    Page<CommentDto> getProjectComments(Pageable pageable, Long projectId);

    Page<CommentDto> getUserComments(Pageable pageable, Long userId);
}
