package com.makeit.api.service.impl;

import com.makeit.api.service.RoleService;
import com.makeit.dao.model.Role;
import com.makeit.dao.model.RoleName;
import com.makeit.dao.repository.RoleRepository;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Collection;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class RoleServiceImpl implements RoleService {

    private final RoleRepository repository;

    /**
     * {@inheritDoc}
     */
    @Override
    public Collection<Role> findAll() {
        return repository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Role findByRoleName(RoleName roleName) {
        return repository.findByRoleName(roleName);
    }
}
