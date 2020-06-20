package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.model.SkillDto;
import com.makeit.api.service.SkillService;
import com.makeit.dao.model.Skill;
import com.makeit.dao.repository.SkillRepository;
import lombok.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.function.UnaryOperator;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Service
@Transactional
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class SkillServiceImpl implements SkillService {

    private final SkillRepository repository;
    private final ObjectMapper objectMapper;

    private Function<Skill, SkillDto> toDto;
    private Function<SkillDto, Skill> toEntity;

    @PostConstruct
    public void initialize() {
        toDto = (entity) -> objectMapper.convertValue(entity, SkillDto.class);
        toEntity = (dto) -> objectMapper.convertValue(dto, Skill.class);
    }

    @Override
    public List<SkillDto> saveSkills(List<SkillDto> dtos) {
        return dtos.stream()
            .filter(Objects::nonNull)
            .map(toEntity)
            .collect(Collectors.collectingAndThen(
                toList(),
                entities -> repository.saveAll(entities)
                    .stream()
                    .map(toDto)
                    .collect(toList())
                )
            );
    }

    @Override
    public SkillDto saveOrUpdateSkill(SkillDto dto) {
        return toEntity
            .andThen(repository::save)
            .andThen(toDto)
            .apply(dto);
    }

    @Override
    public SkillDto deleteSkill(Long id) {
        UnaryOperator<Skill> mapper = Skill -> {
            repository.delete(Skill);
            return Skill;
        };

        return repository.findById(id)
            .map(mapper)
            .map(Skill -> Skill.toBuilder().id(null).build())
            .map(toDto)
            .orElseThrow(() -> new IllegalArgumentException("Skill not found"));
    }

    @Override
    public SkillDto getSkill(Long id) {
        return repository.findById(id).map(toDto).orElse(null);
    }

    @Override
    public Page<SkillDto> getSkills(Pageable pageable) {
        return repository.findAll(pageable).map(toDto);
    }
}

