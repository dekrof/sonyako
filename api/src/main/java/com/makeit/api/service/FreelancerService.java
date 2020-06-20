package com.makeit.api.service;

import com.makeit.api.model.ProjectDto;
import com.makeit.api.model.TopDeveloperDto;
import com.makeit.dao.model.User;
import com.makeit.dao.model.UserStatusType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface FreelancerService {

    User getFreelancer(Long userId);

    List<TopDeveloperDto> getTopNineFreelancers();

    Page<TopDeveloperDto> getFreelancers(Pageable pageable);

    boolean hireFreelancer(Long userId, Long projectId);

    boolean acceptFreelancer(Long userId, Long projectId);

    boolean declineFreelancer(Long userId, Long projectId);

    List<ProjectDto> getUserProjects(Long userId, UserStatusType status);
}
