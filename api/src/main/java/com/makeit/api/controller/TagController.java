package com.makeit.api.controller;

import com.makeit.api.model.ApiResponse;
import com.makeit.api.model.CategoryDto;
import com.makeit.api.model.TagDto;
import com.makeit.api.service.TagService;
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
@RequestMapping("/api/tag")
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class TagController {

    private final TagService service;

    @PostMapping("/")
    public ApiResponse<TagDto> saveTag(@Valid @RequestBody TagDto dto) {
        if (dto == null) {
            return ApiResponse.<TagDto>error()
                .cause("tag.should.not.be.null")
                .build();
        }

        if (dto.getId() != null) {
            return ApiResponse.<TagDto>error()
                .cause("tag.should.not.be.saved.before")
                .build();
        }

        try {
            return ApiResponse.<TagDto>data()
                .data(service.saveOrUpdateTag(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to save tag", ex);
            return ApiResponse.<TagDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @PutMapping("/")
    public ApiResponse<TagDto> updateTag(@Valid @RequestBody TagDto dto) {
        if (dto == null) {
            return ApiResponse.<TagDto>error()
                .cause("tag.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<TagDto>data()
                .data(service.saveOrUpdateTag(dto))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to update tag", ex);
            return ApiResponse.<TagDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @DeleteMapping("/{id}")
    public ApiResponse<TagDto> deleteTag(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<TagDto>error()
                .cause("tag.id.should.not.be.null")
                .build();
        }
        try {
            return ApiResponse.<TagDto>data()
                .data(service.deleteTag(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to delete tag", ex);
            return ApiResponse.<TagDto>error()
                .cause(ex.getMessage())
                .build();
        }
    }

    @GetMapping("/{id}")
    public ApiResponse<TagDto> getTag(@PathVariable("id") Long id) {
        if (id == null) {
            return ApiResponse.<TagDto>error()
                .cause("tag.id.should.not.be.null")
                .build();
        }

        try {
            return ApiResponse.<TagDto>data()
                .data(service.getTag(id))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get tag", ex);
            return ApiResponse.<TagDto>data()
                .data(null)
                .build();
        }
    }

    @GetMapping("/")
    public ApiResponse<Page<TagDto>> getTags(@NotNull Pageable pageable) {
        try {
            return ApiResponse.<Page<TagDto>>data()
                .data(service.getTags(pageable))
                .build();
        } catch (Exception ex) {
            LOGGER.error("Unable to get tags", ex);
            return ApiResponse.<Page<TagDto>>data()
                .data(Page.empty())
                .build();
        }
    }
}
