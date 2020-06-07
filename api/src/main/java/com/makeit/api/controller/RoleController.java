package com.makeit.api.controller;

import com.makeit.api.model.ApiResponse;
import com.makeit.api.model.RoleDto;
import com.makeit.api.model.TaskDto;
import com.makeit.api.service.RoleService;
import com.makeit.api.service.TaskService;
import com.makeit.dao.model.Role;
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
@RequestMapping("/api/role")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class RoleController {

    private final RoleService service;

    @PostMapping("/")
    public ApiResponse<RoleDto> saveRole(@Valid @RequestBody RoleDto dto) {
        if (dto == null) {
            return ApiResponse.<RoleDto>error()
                .cause("role.should.not.be.null")
                .build();
        }

        if (dto.getId() != null) {
            return ApiResponse.<RoleDto>error()
                .cause("role.should.not.be.saved.before")
                .build();
        }

        try {
            return ApiResponse.<RoleDto>data()
                .data(service.saveOrUpdateRole(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to save role", ex);
            return ApiResponse.<RoleDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @PutMapping("/")
    public ApiResponse<RoleDto> updateRole(@Valid @RequestBody RoleDto dto) {
        if (dto == null) {
            return ApiResponse.<RoleDto>error()
                .cause("role.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<RoleDto>data()
                .data(service.saveOrUpdateRole(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to update role", ex);
            return ApiResponse.<RoleDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<RoleDto> deleteRole(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<RoleDto>error()
                .cause("role.id.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<RoleDto>data()
                .data(service.deleteRole(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to delete role", ex);
            return ApiResponse.<RoleDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<RoleDto> getRole(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<RoleDto>error()
                .cause("role.id.should.not.be.null")
                .build();
        }

        try {
            return ApiResponse.<RoleDto>data()
                .data(service.getRole(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get role", ex);
            return ApiResponse.<RoleDto>data()
                .data(null)
                .build();
        }
    }

    @GetMapping("/")
    public ApiResponse<Page<RoleDto>> getRoles(@NotNull Pageable pageable) {
        try {
            return ApiResponse.<Page<RoleDto>>data()
                .data(service.getRoles(pageable))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get roles", ex);
            return ApiResponse.<Page<RoleDto>>data()
                .data(Page.empty())
                .build();
        }
    }
}
