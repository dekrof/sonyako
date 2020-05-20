package com.makeit.api.service;

import com.makeit.api.model.DeviceInfoDto;
import com.makeit.dao.model.RefreshToken;
import com.makeit.dao.model.User;
import com.makeit.dao.model.UserDevice;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
public interface UserDeviceService {
    /**
     * Find the user device info by user id
     */
    Optional<UserDevice> findByUserId(Long userId);

    /**
     * Find the user device info by refresh token
     */
    Optional<UserDevice> findByRefreshToken(RefreshToken refreshToken);

    /**
     * Creates a new user device and set the user to the current device
     */
    @Transactional
    UserDevice createUserDevice(DeviceInfoDto deviceInfo, User user);

    /**
     * Check whether the user device corresponding to the token has refresh enabled and
     * throw appropriate errors to the client
     */
    void verifyRefreshAvailability(RefreshToken refreshToken);
}
