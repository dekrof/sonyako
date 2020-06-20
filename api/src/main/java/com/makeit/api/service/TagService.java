package com.makeit.api.service;

import com.makeit.api.model.TagDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface TagService {

    TagDto saveOrUpdateTag(TagDto dto);

    TagDto deleteTag(Long id);

    TagDto getTag(Long id);

    Page<TagDto> getTags(Pageable pageable);
}
