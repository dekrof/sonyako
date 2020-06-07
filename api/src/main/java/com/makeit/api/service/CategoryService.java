package com.makeit.api.service;

import com.makeit.api.model.CategoryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface CategoryService {

    @Transactional
    CategoryDto saveOrUpdateCategory(CategoryDto dto);

    @Transactional
    CategoryDto deleteCategory(Long id);

    CategoryDto getCategory(Long id);

    Page<CategoryDto> getCategories(Pageable pageable);
}
