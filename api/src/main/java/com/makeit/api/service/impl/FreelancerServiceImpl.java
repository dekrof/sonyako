package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makeit.api.model.AddressDto;
import com.makeit.api.model.ProjectDto;
import com.makeit.api.model.RateDto;
import com.makeit.api.model.TagDto;
import com.makeit.api.model.TopDeveloperDto;
import com.makeit.dao.model.Address;
import com.makeit.dao.model.Payment;
import com.makeit.dao.model.RoleName;
import com.makeit.dao.model.User;
import com.makeit.dao.model.UserProject;
import com.makeit.dao.model.UserProjectId;
import com.makeit.dao.model.UserStatusType;
import com.makeit.dao.repository.UserProjectRepository;
import com.makeit.dao.repository.UserRepository;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
@Slf4j
@Service
@Transactional
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
    public User getFreelancer(Long userId) {
        return repository.getOne(userId);
    }

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
        return repository.findUsersByRole(pageable, RoleName.ROLE_FREELANCER.name()).map((user) -> mapper.apply(objectMapper, user));
    }

    @Override
    public Page<TopDeveloperDto> getOwners(Pageable pageable) {
        return repository.findUsersByRole(pageable, RoleName.ROLE_OWNER.name()).map((user) -> mapper.apply(objectMapper, user));
    }

    @Override
    public boolean hireFreelancer(Long userId, Long projectId) {
        try {
            var userProject = userProjectRepository.save(UserProject.builder()
                .id(UserProjectId.builder()
                    .userId(userId)
                    .projectId(projectId)
                    .build())
                .isUserCreator(false)
                .isUserOwner(false)
                .userStatus(UserStatusType.HIRE_ME)
                .build());
            return userProject != null;
        } catch (Exception ex) {
            LOGGER.error(ex.getMessage(), ex);
            return false;
        }
    }

    @Override
    public boolean acceptFreelancer(Long userId, Long projectId) {
        var userProject = userProjectRepository.findById(UserProjectId.builder()
            .userId(userId)
            .projectId(projectId)
            .build());

        if (userProject.isEmpty()) {
            return false;
        } else {
            var result = userProjectRepository.save(userProject.get()
                .toBuilder()
                .userStatus(UserStatusType.HIRED)
                .build());
            return result != null;
        }
    }

    @Override
    public boolean declineFreelancer(Long userId, Long projectId) {
        var userProject = userProjectRepository.findById(UserProjectId.builder()
            .userId(userId)
            .projectId(projectId)
            .build());

        if (userProject.isEmpty()) {
            return false;
        } else {
            var result = userProjectRepository.save(userProject.get()
                .toBuilder()
                .userStatus(UserStatusType.DECLINED)
                .build());
            return result != null;
        }
    }

    @Override
    public List<ProjectDto> getUserProjects(Long userId, UserStatusType status) {
        var projects = userProjectRepository.findById_UserId(userId);
        var stream = status == null
            ? projects.stream().filter(userProject -> userProject.isUserOwner())
            : projects.stream().filter(userProject -> userProject.getUserStatus() == status);

        return stream
            .map(UserProject::getProject)
            .map(project -> objectMapper.convertValue(project, ProjectDto.class))
            .collect(Collectors.toList());
    }
}
