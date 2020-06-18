package com.makeit.cfg;

import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Configuration
@EnableJpaAuditing(auditorAwareRef = "default-auditor")
@EnableJpaRepositories(basePackages = "com.makeit.dao.repository")
public class JpaConfiguration {

    @Bean
    public Jackson2ObjectMapperBuilder jacksonBuilder() {
        return new Jackson2ObjectMapperBuilder()
            .indentOutput(true)
            .failOnEmptyBeans(false)
            .failOnUnknownProperties(false)
            .featuresToDisable(
                SerializationFeature.WRITE_DATE_TIMESTAMPS_AS_NANOSECONDS,
                SerializationFeature.WRITE_DATES_AS_TIMESTAMPS)
            .modules(
                new JavaTimeModule(),
                new Jdk8Module(),
                new Hibernate5Module()
                    .configure(Hibernate5Module.Feature.FORCE_LAZY_LOADING, true)
                    .configure(Hibernate5Module.Feature.WRITE_MISSING_ENTITIES_AS_NULL, true)
                    .configure(Hibernate5Module.Feature.REQUIRE_EXPLICIT_LAZY_LOADING_MARKER, true)
                    .configure(Hibernate5Module.Feature.SERIALIZE_IDENTIFIER_FOR_LAZY_NOT_LOADED_OBJECTS, true)
            );
    }
}
