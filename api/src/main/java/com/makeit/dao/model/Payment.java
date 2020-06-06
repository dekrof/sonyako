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

    private static final long serialVersionUID = 1300641046506404528L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "card_number")
    private String cardNumber;

    @Column(nullable = false, name = "card_holder")
    private String cardHolder;

    @Column(nullable = false, name = "card_expire_date")
    private String cardExpireDate;

    @Column(nullable = false, name = "beneficiary_name")
    private String beneficiaryName;

    @Column(name = "remittance_info")
    private String remittanceInfo;

    @Enumerated(EnumType.ORDINAL)
    @Column(nullable = false, name = "currency")
    private CurrencyType currency;

    @Column(nullable = false, name = "rate")
    private Double rate;

    @Column(name = "attestation")
    private boolean attestation;
}
