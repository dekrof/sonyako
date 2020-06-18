package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.model.AddressDto;
import com.makeit.api.model.RateDto;
import com.makeit.api.model.TagDto;
import com.makeit.api.model.TopDeveloperDto;
import com.makeit.dao.model.Address;
import com.makeit.dao.model.Payment;
import com.makeit.dao.model.User;
import com.makeit.dao.repository.UserProjectRepository;
import com.makeit.dao.repository.UserRepository;
import lombok.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.stream.Collectors;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class FreelancerServiceImpl implements com.makeit.api.service.FreelancerService {

    private final UserRepository repository;
    private final UserProjectRepository userProjectRepository;

    private final ObjectMapper objectMapper;

    private final BiFunction<ObjectMapper, User, TopDeveloperDto> mapper = (om, user) -> {
        var profile = user.getProfile();
        var tags = user.getTags();
        var address = Optional.ofNullable(profile.getAddress()).orElse(new Address());
        var payment = Optional.ofNullable(profile.getPayment()).orElse(new Payment());

        return TopDeveloperDto.builder()
            .id(user.getId())
            .avatarUrl(profile.getAvatarUrl())
            .firstName(profile.getName())
            .lastName(profile.getSurname())
            .address(om.convertValue(address, AddressDto.class))
            .legalBusiness(payment.getBeneficiaryName())
            .rate(om.convertValue(payment, RateDto.class))
            .tags(tags.stream()
                .map(tag -> om.convertValue(tag, TagDto.class))
                .collect(Collectors.toSet()))
            .build();
    };

    @Override
    public List<TopDeveloperDto> getTopNineFreelancers() {
        var freelancers = repository.findTopNineFreelancers();

        if (freelancers == null) {
            return List.of();
        } else {
            return freelancers.stream()
                .map((user) -> mapper.apply(objectMapper, user))
                .collect(Collectors.toList());
        }
    }

    @Override
    public Page<TopDeveloperDto> getFreelancers(Pageable pageable) {
        return repository.findAll(pageable).map((user) -> mapper.apply(objectMapper, user));
    }
}
