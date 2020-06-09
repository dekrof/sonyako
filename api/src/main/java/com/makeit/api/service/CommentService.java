package com.makeit.api.service;

import com.makeit.api.model.CommentDto;
import com.makeit.api.model.CompanyDto;
import com.makeit.dao.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface CommentService {

    @Transactional
    CommentDto saveOrUpdateComment(CommentDto dto);

    @Transactional
    CommentDto deleteComment(Long id);

    CommentDto getComment(Long id);

    Page<CommentDto> getComments(Pageable pageable);
}
