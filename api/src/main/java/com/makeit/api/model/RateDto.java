package com.makeit.api.model;

import com.makeit.dao.model.CurrencyType;
import lombok.*;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder(toBuilder = true)
public class RateDto {

    private CurrencyType currency;
    private Double rate;
}
