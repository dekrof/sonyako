package com.makeit.dao.repository;

import com.makeit.dao.model.UserComment;
import com.makeit.dao.model.UserCommentId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Repository
public interface UserCommentRepository extends JpaRepository<UserComment, UserCommentId> {

    List<UserComment> findById_UserId(@Param("userId") Long projectId);

    Page<UserComment> findById_UserId(@Param("userId") Long projectId, Pageable pageable);
}
