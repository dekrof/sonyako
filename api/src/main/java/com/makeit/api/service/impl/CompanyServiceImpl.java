package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.model.CompanyDto;
import com.makeit.api.model.TagDto;
import com.makeit.api.service.CompanyService;
import com.makeit.dao.model.Company;
import com.makeit.dao.model.Tag;
import com.makeit.dao.repository.CompanyRepository;
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
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository repository;
    private final ObjectMapper objectMapper;

    private Function<Company, CompanyDto> toDto;
    private Function<CompanyDto, Company> toEntity;

    @PostConstruct
    public void initialize() {
        toDto = (entity) -> objectMapper.convertValue(entity, CompanyDto.class);
        toEntity = (dto) -> objectMapper.convertValue(dto, Company.class);
    }

    @Override
    @Transactional
    public CompanyDto saveOrUpdateCompany(CompanyDto dto) {
        return toEntity
            .andThen(repository::save)
            .andThen(toDto)
            .apply(dto);
    }

    @Override
    @Transactional
    public CompanyDto deleteCompany(Long id) {
        UnaryOperator<Company> mapper = company -> {
            repository.delete(company);
            return company;
        };

        return repository.findById(id)
            .map(mapper)
            .map(company -> company.toBuilder().id(null).build())
            .map(toDto)
            .orElseThrow(() -> new IllegalArgumentException("Company not found"));
    }

    @Override
    public CompanyDto getCompany(Long id) {
        return repository.findById(id).map(toDto).orElse(null);
    }

    @Override
    public Page<CompanyDto> getCompanies(Pageable pageable) {
        return repository.findAll(pageable).map(toDto);
    }
}
