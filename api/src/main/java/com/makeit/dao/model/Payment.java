package com.makeit.dao.model;

import lombok.*;
import lombok.experimental.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Entity
@Table(name = "PAYMENT")
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Payment extends AbstractEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String cardNumber;

    @Column(nullable = false)
    private String cardHolder;

    @Column(nullable = false)
    private LocalDate validThru;

    @Column(nullable = false)
    private String nameOfBusiness;

    @Column
    private String remittanceInformation;

    @Column(nullable = false)
    private boolean isCardOwner;

    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false)
    private CurrencyType currency;

    @Column(nullable = false)
    private Long baseRate;

}
