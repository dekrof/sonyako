package com.makeit.dao.repository;

import com.makeit.dao.model.UserProject;
import com.makeit.dao.model.UserProjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Stream;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Repository
public interface UserProjectRepository extends JpaRepository<UserProject, UserProjectId> {

    List<UserProject> findById_ProjectId(@Param("projectId") Long projectId);

    List<UserProject> findById_UserId(@Param("userId") Long userId);

    @Query(
        nativeQuery = true,
        value
            = "SELECT * FROM USER_PROJECT usp, USER usr, PROJECT prj "
            + "WHERE usp.project_id = prj.id "
            + "    AND usp.user_id = usr.id "
            + "    AND usp.is_user_owner = true "
            + "    AND prj.category_id = :categoryId"
    )
    Page<UserProject> getProjectsByCategory(Pageable pageable, @Param("categoryId") Long categoryId);

    @Query(
        nativeQuery = true,
        value
            = "SELECT * FROM USER_PROJECT usp, USER usr, PROJECT prj "
            + "WHERE usp.project_id = prj.id "
            + "    AND usp.user_id = usr.id "
            + "    AND usp.is_user_owner = true "
            + "LIMIT 10"
    )
    Stream<UserProject> getLastTenProjects();
}
