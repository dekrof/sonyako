package com.makeit.api.service;

import com.makeit.api.model.LogoutDto;
import com.makeit.api.model.RegistrationDto;
import com.makeit.dao.model.RoleName;
import com.makeit.dao.model.User;
import com.makeit.security.JwtUserDetails;

import java.util.List;
import java.util.Optional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface UserService {
    List getHistory(Long userId);

    /**
     * Finds a user in the database by username
     */
    Optional<User> findByUsername(String username);

    /**
     * Find a user in db by id.
     */
    Optional<User> findById(Long id);

    /**
     * Find a list of users by requested role.
     *
     * @param roleName the name of user's role
     */
    List<User> findAllByRoles(RoleName roleName);

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
    User createUser(RegistrationDto registerRequest);

    /**
     * Log the given user out and delete the refresh token associated with it. If no device
     * id is found matching the database for the given user, throw a log out exception.
     *
     * @param currentUser the current user in system
     * @param request     the logout request
     */
    void logoutUser(JwtUserDetails currentUser, LogoutDto request);
}
