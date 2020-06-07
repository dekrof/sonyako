package com.makeit.api.service;

import com.makeit.api.model.CompanyDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface CompanyService {

    @Transactional
    CompanyDto saveOrUpdateCompany(CompanyDto dto);

    @Transactional
    CompanyDto deleteCompany(Long id);

    CompanyDto getCompany(Long id);

    Page<CompanyDto> getCompanies(Pageable pageable);
}
