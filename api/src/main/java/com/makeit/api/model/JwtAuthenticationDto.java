package com.makeit.api.model;

import lombok.*;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class JwtAuthenticationDto {

    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private Long expiryDuration;

    @Builder(toBuilder = true)
    public JwtAuthenticationDto(String accessToken, String refreshToken, Long expiryDuration) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiryDuration = expiryDuration;
        tokenType = "Bearer";
    }
}
