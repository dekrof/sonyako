package com.makeit.cfg;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Configuration
@EnableJpaAuditing(auditorAwareRef = "default-auditor")
@EnableJpaRepositories(basePackages = "com.makeit.dao.repository")
public class JpaConfiguration {
}
