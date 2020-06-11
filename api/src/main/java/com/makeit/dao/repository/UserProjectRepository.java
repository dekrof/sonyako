package com.makeit.dao.repository;

import com.makeit.dao.model.UserProject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Repository
public interface UserProjectRepository extends JpaRepository<UserProject, Long> {
}
