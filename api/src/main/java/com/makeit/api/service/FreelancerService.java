package com.makeit.api.service;

import com.makeit.api.model.TopDeveloperDto;

import java.util.List;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface FreelancerService {

    List<TopDeveloperDto> getTopNineFreelancers();
}
