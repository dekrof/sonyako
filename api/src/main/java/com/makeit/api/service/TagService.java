package com.makeit.api.service;

import com.makeit.api.model.CategoryDto;
import com.makeit.api.model.TagDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface TagService {

    @Transactional
    TagDto saveOrUpdateTag(TagDto dto);

    @Transactional
    TagDto deleteTag(Long id);

    TagDto getTag(Long id);

    Page<TagDto> getTags(Pageable pageable);
}
