package com.makeit.cfg;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Configuration
public class HistoryFallBackConfiguration implements WebMvcConfigurer {

    public static final String FORWARD_INDEX_URL = "forward:/public/web/index.html";
    public static final String FORWARD_BUILD_URL = "forward:/public/web/build.js";

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // map any images
        registry.addResourceHandler("/**/{filepath:[\\w\\-]+\\.png}").addResourceLocations("classpath:/public/web/");
        registry.addResourceHandler("/**/{filepath:[\\w\\-]+\\.jpg}").addResourceLocations("classpath:/public/web/");
        registry.addResourceHandler("/**/{filepath:[\\w\\-]+\\.gif}").addResourceLocations("classpath:/public/web/");
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        // map "/"
        registry.addViewController("/").setViewName(FORWARD_INDEX_URL);
        registry.addViewController("/build.js").setViewName(FORWARD_BUILD_URL);

        // single directory level - no need to exclude "api"
        registry.addViewController("/{x:[\\w\\-]+}").setViewName(FORWARD_INDEX_URL);

        // multi-level directory path, need to exclude "api" on the first part of the path
        registry.addViewController("/{x:^(?!api$).*$}/**/{y:[\\w\\-]+}").setViewName(FORWARD_INDEX_URL);
    }
}
