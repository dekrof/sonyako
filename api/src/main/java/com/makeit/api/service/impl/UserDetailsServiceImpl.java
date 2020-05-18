package com.makeit.api.service.impl;

import com.makeit.dao.repository.UserRepository;
import com.makeit.security.JwtUserDetails;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.text.MessageFormat;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var dbUser = userRepository.findByProfileEmail(email);

        LOGGER.info("Fetched user=[{}] by email='{}'", dbUser, email);
        return dbUser.map(JwtUserDetails::new).orElseThrow(() -> new UsernameNotFoundException(
            String.format("Couldn't find a matching user email in the database for %s", email)
        ));
    }

    public UserDetails loadUserById(Long id) {
        var dbUser = userRepository.findById(id);
        LOGGER.info(MessageFormat.format("Fetched user : {0} by {1}", dbUser, id));
        return dbUser.map(JwtUserDetails::new)
            .orElseThrow(() -> new UsernameNotFoundException("Couldn't find a matching user id in the database for " + id));
    }
}
