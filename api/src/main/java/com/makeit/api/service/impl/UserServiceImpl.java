package com.makeit.api.service.impl;

import com.google.common.collect.Sets;
import com.makeit.api.model.security.RegistrationRequest;
import com.makeit.api.service.RoleService;
import com.makeit.api.service.UserService;
import com.makeit.dao.model.Role;
import com.makeit.dao.model.RoleName;
import com.makeit.dao.model.User;
import com.makeit.dao.repository.UserRepository;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Optional;
import java.util.Set;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    private final RoleService roleService;

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public User createUser(RegistrationRequest registerRequest) {
        var user = User.builder()
            .username(registerRequest.getEmail())
            .password(passwordEncoder.encode(registerRequest.getPassword()))
            .roles(getRolesForNewUser(registerRequest.isRegisterAsAdmin()))
            .active(true)
            .emailVerified(false)
            .build();

        return save(user);
    }

    /**
     * Performs a quick check to see what roles the new user could be assigned to.
     *
     * @return list of roles for the new user
     */
    private Set<Role> getRolesForNewUser(boolean isToBeMadeAdmin) {
        var newUserRoles = Sets.newHashSet(roleService.findAll());

        if (!isToBeMadeAdmin) {
            newUserRoles.removeIf(role -> RoleName.ROLE_ADMIN.equals(role.getRole()));
        }

        LOGGER.info("Setting user roles: {}", newUserRoles);
        return newUserRoles;
    }
}
