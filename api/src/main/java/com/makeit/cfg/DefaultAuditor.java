package com.makeit.cfg;

import com.makeit.security.JwtUserDetails;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Component("default-auditor")
public class DefaultAuditor implements AuditorAware<String> {

    public static final String ROLE_ANONYMOUS = "ROLE_ANONYMOUS";
    public static final String SYSTEM_AUDITOR = "system@makeit.com";

    @Override
    public Optional<String> getCurrentAuditor() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
            || !authentication.isAuthenticated()
            || authentication.getAuthorities().stream().anyMatch(auth -> auth.getAuthority().equals(ROLE_ANONYMOUS))
        ) {
            return Optional.of(SYSTEM_AUDITOR);
        }

        return Optional.of(((JwtUserDetails)authentication.getPrincipal()).getUser().getProfile().getEmail());
    }
}
