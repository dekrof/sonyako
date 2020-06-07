package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.model.RoleDto;
import com.makeit.api.model.TagDto;
import com.makeit.api.service.RoleService;
import com.makeit.dao.model.Role;
import com.makeit.dao.model.RoleName;
import com.makeit.dao.model.Tag;
import com.makeit.dao.repository.RoleRepository;
import com.makeit.dao.repository.TagRepository;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.Collection;
import java.util.function.Function;
import java.util.function.UnaryOperator;

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
    private final ObjectMapper objectMapper;

    private Function<Role, RoleDto> toDto;
    private Function<RoleDto, Role> toEntity;

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

    @PostConstruct
    public void initialize() {
        toDto = (entity) -> objectMapper.convertValue(entity, RoleDto.class);
        toEntity = (dto) -> objectMapper.convertValue(dto, Role.class);
    }

    @Override
    @Transactional
    public RoleDto saveOrUpdateRole(RoleDto dto) {
        return toEntity
            .andThen(repository::save)
            .andThen(toDto)
            .apply(dto);
    }

    @Override
    @Transactional
    public RoleDto deleteRole(Long id) {
        UnaryOperator<Role> mapper = role -> {
            repository.delete(role);
            return role;
        };

        return repository.findById(id)
            .map(mapper)
            .map(role -> role.toBuilder().id(null).build())
            .map(toDto)
            .orElseThrow(() -> new IllegalArgumentException("Role not found"));
    }

    @Override
    public RoleDto getRole(Long id) {
        return repository.findById(id).map(toDto).orElse(null);
    }

    @Override
    public Page<RoleDto> getRoles(Pageable pageable) {
        return repository.findAll(pageable).map(toDto);
    }
}
