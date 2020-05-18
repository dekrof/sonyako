package com.makeit.cfg;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.ObjectVendorExtension;
import springfox.documentation.service.StringVendorExtension;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.List;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2)
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.makeit.api"))
            .paths(PathSelectors.regex("/api.*"))
            .build()
            .apiInfo(metaInfo());
    }

    private List<VendorExtension> vendorExtensions() {
        var logo = new ObjectVendorExtension("x-logo");
        logo.addProperty(new StringVendorExtension("url", "/public/api-docs/logo.png"));

        return List.of(logo);
    }

    private ApiInfo metaInfo() {
        return new ApiInfoBuilder()
            .description("Backend API For Job Promoter Application")
            .title("Job Promoter Application API")
            .version("Unreleased [WIP]")
            .extensions(vendorExtensions())
            .contact(new Contact("Makydon Sofiia", "https://github.com/sonnyako", "sonnyako@gmail.com"))
            .license("Private of Makydon Sofiia")
            .licenseUrl("javascript://void")
            .build();
    }
}
