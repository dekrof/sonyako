package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.model.CategoryDto;
import com.makeit.api.model.TagDto;
import com.makeit.api.service.TagService;
import com.makeit.dao.model.Category;
import com.makeit.dao.model.Tag;
import com.makeit.dao.repository.CategoryRepository;
import com.makeit.dao.repository.TagRepository;
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
public class TagServiceImpl implements TagService {

    private final TagRepository repository;
    private final ObjectMapper objectMapper;

    private Function<Tag, TagDto> toDto;
    private Function<TagDto, Tag> toEntity;

    @PostConstruct
    public void initialize() {
        toDto = (entity) -> objectMapper.convertValue(entity, TagDto.class);
        toEntity = (dto) -> objectMapper.convertValue(dto, Tag.class);
    }

    @Override
    @Transactional
    public TagDto saveOrUpdateTag(TagDto dto) {
        return toEntity
            .andThen(repository::save)
            .andThen(toDto)
            .apply(dto);
    }

    @Override
    @Transactional
    public TagDto deleteTag(Long id) {
        UnaryOperator<Tag> mapper = tag -> {
            repository.delete(tag);
            return tag;
        };

        return repository.findById(id)
            .map(mapper)
            .map(tag -> tag.toBuilder().id(null).build())
            .map(toDto)
            .orElseThrow(() -> new IllegalArgumentException("Tag not found"));
    }

    @Override
    public TagDto getTag(Long id) {
        return repository.findById(id).map(toDto).orElse(null);
    }

    @Override
    public Page<TagDto> getTags(Pageable pageable) {
        return repository.findAll(pageable).map(toDto);
    }
}

