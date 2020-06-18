package com.makeit.api.controller;

import com.makeit.api.model.ApiResponse;
import com.makeit.api.model.CategoryDto;
import com.makeit.api.service.CategoryService;
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
@RequestMapping("/api/category")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class CategoryController {

    private final CategoryService service;

    @PostMapping("")
    public ApiResponse<CategoryDto> saveCategory(@Valid @RequestBody CategoryDto dto) {
        if (dto == null) {
            return ApiResponse.<CategoryDto>error()
                .cause("category.should.not.be.null")
                .build();
        }

        if (dto.getId() != null) {
            return ApiResponse.<CategoryDto>error()
                .cause("category.should.not.be.saved.before")
                .build();
        }

        try {
            return ApiResponse.<CategoryDto>data()
                .data(service.saveOrUpdateCategory(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to save category", ex);
            return ApiResponse.<CategoryDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @PutMapping("")
    public ApiResponse<CategoryDto> updateCategory(@Valid @RequestBody CategoryDto dto) {
        if (dto == null) {
            return ApiResponse.<CategoryDto>error()
                .cause("category.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<CategoryDto>data()
                .data(service.saveOrUpdateCategory(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to update category", ex);
            return ApiResponse.<CategoryDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<CategoryDto> deleteCategory(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<CategoryDto>error()
                .cause("category.id.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<CategoryDto>data()
                .data(service.deleteCategory(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to delete category", ex);
            return ApiResponse.<CategoryDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<CategoryDto> getCategory(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<CategoryDto>error()
                .cause("category.id.should.not.be.null")
                .build();
        }

        try {
            return ApiResponse.<CategoryDto>data()
                .data(service.getCategory(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get category", ex);
            return ApiResponse.<CategoryDto>data()
                .data(null)
                .build();
        }
    }

    @GetMapping("")
    public ApiResponse<Page<CategoryDto>> getCategories(@NotNull Pageable pageable) {
        try {
            return ApiResponse.<Page<CategoryDto>>data()
                .data(service.getCategories(pageable))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get categories", ex);
            return ApiResponse.<Page<CategoryDto>>data()
                .data(Page.empty())
                .build();
        }
    }
}
