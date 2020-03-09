package com.makeit.api.service;

import com.makeit.dao.model.Role;

import java.util.Collection;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface RoleService {

    /**
     * Find all roles from the database
     */
    Collection<Role> findAll();
}
