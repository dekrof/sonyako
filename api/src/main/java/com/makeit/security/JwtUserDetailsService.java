package com.makeit.security;

import com.makeit.dao.model.User;
import com.makeit.dao.repository.UserRepository;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import javax.transaction.Transactional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class JwtUserDetailsService implements UserDetailsService {

    @Lazy
    @Inject
    private PasswordEncoder passwordEncoder;

    private final UserRepository repository;

    /**
     * {@inheritDoc}
     * todo: the user authorities not added yet
     */
    @Override
    public UserDetails loadUserByUsername(String username) {
        var user = username.contains("@")
            ? repository.findByProfileEmail(username)
            : repository.findByUsername(username);

        return user
            .map(JwtUserDetails::new)
            .orElseThrow(() -> new UsernameNotFoundException(String.format("User not found with username: %s", username)));
    }

    /**
     * Locates the user based on the username.
     *
     * @param id the ID identifying the user whose data required.
     * @return a fully populated user record (never <code>null</code>)
     * @throws UsernameNotFoundException if the user could not be found.
     */
    public UserDetails loadUserById(Long id) {
        var user = repository.findById(id);
        LOGGER.info("Fetched user : {}, by {}", user, id);
        return user
            .map(JwtUserDetails::new)
            .orElseThrow(() -> new UsernameNotFoundException(String.format("User not found with id: %s", id)));
    }

    @Transactional
    public User save(User user) {
        var newUser = User.builder()
            .username(user.getUsername())
            .password(passwordEncoder.encode(user.getPassword()))
            .build();

        return repository.save(newUser);
    }
}
