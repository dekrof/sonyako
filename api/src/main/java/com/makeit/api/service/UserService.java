package com.makeit.api.service;

import com.makeit.api.model.security.RegistrationRequest;
import com.makeit.dao.model.User;

import java.util.Optional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface UserService {
    /**
     * Finds a user in the database by username
     */
    Optional<User> findByUsername(String username);

    /**
     * Finds a user in the database by email
     */
    Optional<User> findByEmail(String email);

    /**
     * Find a user in db by id.
     */
    Optional<User> findById(Long id);

    /**
     * Save the user to the database
     */
    User save(User user);

    /**
     * Check is the user exists given the email: naturalId
     */
    Boolean existsByEmail(String email);

    /**
     * Check is the user exists given the username: naturalId
     */
    Boolean existsByUsername(String username);

    /**
     * Creates a new user from the registration request
     */
    User createUser(RegistrationRequest registerRequest);
}
