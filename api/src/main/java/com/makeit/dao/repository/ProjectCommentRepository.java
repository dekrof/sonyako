package com.makeit.dao.repository;

import com.makeit.dao.model.ProjectComment;
import com.makeit.dao.model.ProjectCommentId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Repository
public interface ProjectCommentRepository extends JpaRepository<ProjectComment, ProjectCommentId> {

    List<ProjectComment> findProjectCommentsById_ProjectIdIn(@Param("projectIds") Set<Long> projectIds);

    List<ProjectComment> findById_ProjectId(@Param("projectId") Long projectId);

    Page<ProjectComment> findById_ProjectId(@Param("projectId") Long projectId, Pageable pageable);
}
