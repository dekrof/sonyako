package com.makeit.dao.repository;

import com.makeit.dao.model.Role;
import com.makeit.dao.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds user by username
     *
     * @param username the username of user to be search for
     * @return an optional user
     */
    Optional<User> findByUsername(String username);

    /**
     * Finds user by username
     *
     * @param role the role of user
     * @return the list of roles
     */
    List<User> findAllByRolesContains(Role role);

    /**
     * Tests if user exists
     *
     * @param username the username of user to be search for
     */
    boolean existsByUsername(String username);

    /**
     * Finds user by email
     *
     * @param email the email of user to be search for
     * @return an optional user
     */
    Optional<User> findByProfileEmail(String email);

    /**
     * Tests if user exists
     *
     * @param email the email of user to be search for
     */
    boolean existsByProfileEmail(String email);
}
