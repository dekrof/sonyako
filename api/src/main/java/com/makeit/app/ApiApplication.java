package com.makeit.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Profile;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Profile("dev")
@ComponentScan(basePackages = "com.makeit.*")
@EntityScan({"com.makeit.dao.model", "org.springframework.data.jpa.convert.threeten"})
@SpringBootApplication
@EnableTransactionManagement(proxyTargetClass = true)
public class ApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiApplication.class, args);
    }
}
