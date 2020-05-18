package com.makeit.api.service;

import com.makeit.dao.model.Role;
import com.makeit.dao.model.RoleName;

import java.util.Collection;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface RoleService {

    /**
     * Finds all roles from the database
     */
    Collection<Role> findAll();

    /**
     * Finds role by role name
     *
     * @param roleName the role name
     * @return the requested role
     */
    Role findByRoleName(RoleName roleName);
}
