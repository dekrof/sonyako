package com.makeit.api.service.impl;

import com.makeit.api.exception.TokenRefreshException;
import com.makeit.api.model.DeviceInfoDto;
import com.makeit.dao.model.RefreshToken;
import com.makeit.dao.model.User;
import com.makeit.dao.model.UserDevice;
import com.makeit.dao.repository.UserDeviceRepository;
import lombok.*;
import lombok.extern.slf4j.*;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Optional;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@Service
@RequiredArgsConstructor(onConstructor = @__(@Inject))
public class UserDeviceServiceImpl implements com.makeit.api.service.UserDeviceService {

    private final UserDeviceRepository repository;

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<UserDevice> findByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<UserDevice> findByRefreshToken(RefreshToken refreshToken) {
        return repository.findByRefreshToken(refreshToken);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public UserDevice createUserDevice(DeviceInfoDto deviceInfo, User user) {
        var userDevice = UserDevice.builder()
            .deviceId(deviceInfo.getDeviceId())
            .deviceType(deviceInfo.getDeviceType())
            .notificationToken(deviceInfo.getNotificationToken())
            .user(user)
            .isRefreshActive(true)
            .build();

        return repository.save(userDevice);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void verifyRefreshAvailability(RefreshToken refreshToken) {
        var userDevice = findByRefreshToken(refreshToken).orElseThrow(() -> new TokenRefreshException(
            refreshToken.getToken(),
            "No device found for the matching token. Please login again"
        ));

        if (!userDevice.isRefreshActive()) {
            throw new TokenRefreshException(
                refreshToken.getToken(),
                "Refresh blocked for the device. Please login through a different device"
            );
        }
    }
}
