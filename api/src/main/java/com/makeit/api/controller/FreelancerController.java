package com.makeit.api.controller;

import com.makeit.api.model.ApiResponse;
import com.makeit.api.model.TopDeveloperDto;
import com.makeit.api.model.UserDto;
import com.makeit.api.service.FreelancerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import java.util.List;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Api(
    value = "Freelancer Rest API",
    description = "Defines endpoints to find and edit information about registered freelancers"
)
@Slf4j
@RestController
@RequestMapping("/api/freelancer")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class FreelancerController {

    private final FreelancerService service;

    /**
     * Gets the first top nine freelancers
     */
    @PermitAll
    @GetMapping("/get/top/nine/freelancers")
    @ApiOperation(
        notes = "Get the first top nine freelancers",
        value = "Returns the first top nine freelancers, which are displayed on the home page"
    )
    public ResponseEntity<List<TopDeveloperDto>> getTopNineFreelancers() {
        return ResponseEntity.ok(service.getTopNineFreelancers());
    }

    @PermitAll
    @GetMapping("/{id}")
    public ApiResponse<UserDto> getFreelancer(Long id) {
        return null;
    }

    @PermitAll
    @GetMapping("/of/category/{categoryId}")
    public ApiResponse<Page<TopDeveloperDto>> getFreelancers(Pageable pageable, @PathVariable("categoryId") Long categoryId) {
        try {
            return ApiResponse.<Page<TopDeveloperDto>>data()
                .data(service.getFreelancers(pageable))
                .build();
        } catch (Exception ex) {
            LOGGER.error(ex.getMessage(), ex);
            return ApiResponse.<Page<TopDeveloperDto>>error()
                .cause(ex.getMessage())
                .data(Page.empty())
                .build();
        }
    }
}
