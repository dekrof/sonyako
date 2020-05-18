package com.makeit.dao.model;

import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@EqualsAndHashCode(callSuper = true)
public class JwtAuthenticationToken extends UsernamePasswordAuthenticationToken {

    private static final long serialVersionUID = 454083483563328246L;

    @Getter
    private final String token;

    public JwtAuthenticationToken(String token) {
        this(null, null, token);
    }

    public JwtAuthenticationToken(Object principal, Object credentials, String token) { // NOSONAR;
        super(principal, credentials);
        this.token = token;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Object getCredentials() {
        return null;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Object getPrincipal() {
        return null;
    }
}
