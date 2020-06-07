package com.makeit.api.controller;

import com.makeit.api.model.ApiResponse;
import com.makeit.api.model.CompanyDto;
import com.makeit.api.model.TaskDto;
import com.makeit.api.service.CompanyService;
import com.makeit.api.service.TaskService;
import com.makeit.dao.model.Company;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class CompanyController {

    private final CompanyService service;

    @PostMapping("/")
    public ApiResponse<CompanyDto> saveCompany(@Valid @RequestBody CompanyDto dto) {
        if (dto == null) {
            return ApiResponse.<CompanyDto>error()
                .cause("company.should.not.be.null")
                .build();
        }

        if (dto.getId() != null) {
            return ApiResponse.<CompanyDto>error()
                .cause("company.should.not.be.saved.before")
                .build();
        }

        try {
            return ApiResponse.<CompanyDto>data()
                .data(service.saveOrUpdateCompany(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to save company", ex);
            return ApiResponse.<CompanyDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @PutMapping("/")
    public ApiResponse<CompanyDto> updateCompany(@Valid @RequestBody CompanyDto dto) {
        if (dto == null) {
            return ApiResponse.<CompanyDto>error()
                .cause("company.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<CompanyDto>data()
                .data(service.saveOrUpdateCompany(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to update company", ex);
            return ApiResponse.<CompanyDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<CompanyDto> deleteCompany(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<CompanyDto>error()
                .cause("company.id.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<CompanyDto>data()
                .data(service.deleteCompany(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to delete company", ex);
            return ApiResponse.<CompanyDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<CompanyDto> getCompany(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<CompanyDto>error()
                .cause("company.id.should.not.be.null")
                .build();
        }

        try {
            return ApiResponse.<CompanyDto>data()
                .data(service.getCompany(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get task", ex);
            return ApiResponse.<CompanyDto>data()
                .data(null)
                .build();
        }
    }

    @GetMapping("/")
    public ApiResponse<Page<CompanyDto>> getCompanies(@NotNull Pageable pageable) {
        try {
            return ApiResponse.<Page<CompanyDto>>data()
                .data(service.getCompanies(pageable))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get company", ex);
            return ApiResponse.<Page<CompanyDto>>data()
                .data(Page.empty())
                .build();
        }
    }
}
