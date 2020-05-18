package com.makeit.dao.model;

import com.makeit.supported.validation.NullOrNotBlank;
import lombok.*;
import lombok.experimental.*;
import org.hibernate.annotations.NaturalId;
import org.hibernate.validator.constraints.URL;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.LocalDate;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Data
@Entity
@Table(name = "PROFILE")
@SuperBuilder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@EqualsAndHashCode(callSuper = true)
public class Profile extends AbstractEntity {

    private static final long serialVersionUID = -7809030956941864783L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NaturalId
    @Column(name = "email", unique = true)
    @NotBlank(message = "User email should not be null")
    private String email;

    @Column(name = "phone_number", unique = true)
    @Size(min = 11, max = 13, message = "User phone number should be between 11 and 13 digits")
    @Pattern(regexp = "\\d+", message = "Only digits are applicable")
    @NotEmpty(message = "User phone number should not be null")
    private String phoneNumber;

    @Column(nullable = false)
    @NotEmpty(message = "First name should not be blank")
    private String name;

    @Column(name = "patronymic_name")
    @NullOrNotBlank(message = "The patronymic name should not be blank")
    private String patronymicName;

    @Column(nullable = false)
    @NotEmpty(message = "Last name should not be blank")
    private String surname;

    @Column(nullable = false)
    private LocalDate birthday;

    @Column(name = "avatar_url")
    @URL(message = "The user avatar should be the URL to external or file system resource")
    private String avatarUrl;

    @Valid
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;
}
