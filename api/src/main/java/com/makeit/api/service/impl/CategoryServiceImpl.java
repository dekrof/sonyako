package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.model.CategoryDto;
import com.makeit.api.service.CategoryService;
import com.makeit.dao.model.Category;
import com.makeit.dao.repository.CategoryRepository;
import lombok.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.function.Function;
import java.util.function.UnaryOperator;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;
    private final ObjectMapper objectMapper;

    private Function<Category, CategoryDto> toDto;
    private Function<CategoryDto, Category> toEntity;

    @PostConstruct
    public void initialize() {
        toDto = (entity) -> objectMapper.convertValue(entity, CategoryDto.class);
        toEntity = (dto) -> objectMapper.convertValue(dto, Category.class);
    }

    @Override
    @Transactional
    public CategoryDto saveOrUpdateCategory(CategoryDto dto) {
        return toEntity
            .andThen(repository::save)
            .andThen(toDto)
            .apply(dto);
    }

    @Override
    @Transactional
    public CategoryDto deleteCategory(Long id) {
        UnaryOperator<Category> mapper = category -> {
            repository.delete(category);
            return category;
        };

        return repository.findById(id)
            .map(mapper)
            .map(category -> category.toBuilder().id(null).build())
            .map(toDto)
            .orElseThrow(() -> new IllegalArgumentException("Category not found"));
    }

    @Override
    public CategoryDto getCategory(Long id) {
        return repository.findById(id).map(toDto).orElse(null);
    }

    @Override
    public Page<CategoryDto> getCategories(Pageable pageable) {
        return repository.findAll(pageable).map(toDto);
    }
}
