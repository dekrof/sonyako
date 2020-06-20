package com.makeit.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Sets;
import com.makeit.api.exception.UserLogoutException;
import com.makeit.api.model.CommentDto;
import com.makeit.api.model.HistoryDto;
import com.makeit.api.model.LogoutDto;
import com.makeit.api.model.ProjectDto;
import com.makeit.api.model.RegistrationDto;
import com.makeit.api.model.UserDto;
import com.makeit.api.service.RefreshTokenService;
import com.makeit.api.service.RoleService;
import com.makeit.api.service.UserDeviceService;
import com.makeit.api.service.UserService;
import com.makeit.dao.model.CommentType;
import com.makeit.dao.model.HistoryType;
import com.makeit.dao.model.Role;
import com.makeit.dao.model.RoleName;
import com.makeit.dao.model.User;
import com.makeit.dao.model.UserProject;
import com.makeit.dao.model.UserProjectId;
import com.makeit.dao.repository.ProjectCommentRepository;
import com.makeit.dao.repository.UserCommentRepository;
import com.makeit.dao.repository.UserProjectRepository;
import com.makeit.dao.repository.UserRepository;
import com.makeit.security.JwtUserDetails;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.time.temporal.ChronoUnit;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class UserServiceImpl implements UserService {

    private final ObjectMapper objectMapper;
    private final UserProjectRepository userProjectRepository;
    private final UserCommentRepository userCommentRepository;
    private final ProjectCommentRepository projectCommentRepository;

    @Lazy
    @Inject
    private PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;
    private final RoleService roleService;
    private final UserDeviceService deviceService;
    private final RefreshTokenService refreshTokenService;

    @Override
    public List getHistory(Long userId) {
        var comments = userCommentRepository.findById_UserId(userId).stream()
            .map(userComment -> HistoryDto.builder()
                .comment(objectMapper.convertValue(userComment.getComment(), CommentDto.class))
                .createdAt(userComment.getComment().getCreatedAt())
                .belongTo(objectMapper.convertValue(userComment.getUser(), UserDto.class))
                .dated(true)
                .type(HistoryType.COMMENT)
                .commentType(CommentType.USER)
                .build()
            );

        List<UserProject> userProjects = userProjectRepository.findById_UserId(userId);
        Set<Long> projectIds = userProjects.stream()
            .map(UserProject::getId)
            .map(UserProjectId::getProjectId)
            .collect(Collectors.toSet());

        var projects = userProjects.stream()
            .map(userProject -> HistoryDto.builder()
                .type(HistoryType.PROJECT)
                .project(objectMapper.convertValue(userProject.getProject(), ProjectDto.class))
                .createdAt(userProject.getProject()
                    .getCreatedAt()
                    .plus(userProject.isUserCreator() ? 0 : userProject.getUserStatus().ordinal(), ChronoUnit.MINUTES))
                .dated(userProject.isUserCreator())
                .userStatus(userProject.isUserCreator() ? null : userProject.getUserStatus())
                .build()
            );

        var stream = Stream.concat(comments, projects);

        var projectComments = projectCommentRepository.findProjectCommentsById_ProjectIdIn(projectIds)
            .stream()
            .map(projectComment -> HistoryDto.builder()
                .comment(objectMapper.convertValue(projectComment.getComment(), CommentDto.class))
                .createdAt(projectComment.getComment().getCreatedAt())
                .belongTo(objectMapper.convertValue(projectComment.getProject(), ProjectDto.class))
                .type(HistoryType.COMMENT)
                .commentType(CommentType.PROJECT)
                .dated(true)
                .build()
            );

        return Stream.concat(stream, projectComments)
            .sorted((left, right) -> Comparator.comparing(HistoryDto::getCreatedAt).compare(left, right))
            .collect(Collectors.toList());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public List<User> findAllByRoles(RoleName roleName) {
        var role = roleService.findByRoleName(roleName);
        if (role == null) {
            return List.of();
        }

        var users = userRepository.findAllByRolesContains(role);
        return users == null
            ? List.of()
            : users;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean existsByEmail(String email) {
        return userRepository.existsByProfileEmail(email);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public User createUser(RegistrationDto request) {
        var user = User.builder()
            .username(request.getUsername())
            .password(passwordEncoder.encode(request.getPassword()))
            .roles(getRolesForNewUser(request.isRegisterAsAdmin()))
            .profile(request.getProfile().toBuilder()
                .email(request.getEmail())
                .phoneNumber(request.getProfile().getPhoneNumber().replaceAll("\\D+", ""))
                .payment(request.getProfile().getPayment())
                .build())
            .active(true)
            .emailVerified(false)
            .build();

        return save(user);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void logoutUser(JwtUserDetails currentUser, LogoutDto request) {
        var deviceId = request.getDeviceInfo().getDeviceId();
        var userDevice = deviceService.findByUserId(currentUser.getUser().getId())
            .filter(device -> device.getDeviceId().equals(deviceId))
            .orElseThrow(() -> new UserLogoutException(
                request.getDeviceInfo().getDeviceId(),
                "Invalid device Id supplied. No matching device found for the given user "
            ));

        LOGGER.info("Removing refresh token associated with device [" + userDevice + "]");
        refreshTokenService.deleteById(userDevice.getRefreshToken().getId());
    }

    /**
     * Performs a quick check to see what roles the new user could be assigned to.
     *
     * @return list of roles for the new user
     */
    private Set<Role> getRolesForNewUser(boolean isToBeMadeAdmin) {
        var newUserRoles = Sets.newHashSet(roleService.findAll());

        if (!isToBeMadeAdmin) {
            newUserRoles.removeIf(role -> RoleName.ROLE_ADMIN.equals(role.getRoleName()));
        }

        LOGGER.info("Setting user roles: {}", newUserRoles);
        return newUserRoles;
    }
}
