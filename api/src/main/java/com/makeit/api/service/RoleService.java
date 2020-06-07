package com.makeit.api.service;

import com.makeit.api.model.CompanyDto;
import com.makeit.api.model.RoleDto;
import com.makeit.dao.model.Role;
import com.makeit.dao.model.RoleName;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;
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

    @Transactional
    RoleDto saveOrUpdateRole(RoleDto dto);

    @Transactional
    RoleDto deleteRole(Long id);

    RoleDto getRole(Long id);

    Page<RoleDto> getRoles(Pageable pageable);
}
