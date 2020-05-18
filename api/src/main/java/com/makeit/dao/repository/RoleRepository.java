package com.makeit.dao.repository;

import com.makeit.dao.model.Role;
import com.makeit.dao.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    /**
     * Finds role by its name
     *
     * @param roleName the name of role
     * @return the role
     */
    Role findByRoleName(RoleName roleName);
}
