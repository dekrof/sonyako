package com.makeit.supported.validation;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.*;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Target({ElementType.FIELD})
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = NullOrNotBlank.NullOrNotBlankValidator.class)
public @interface NullOrNotBlank {

    String message();

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    final class NullOrNotBlankValidator implements ConstraintValidator<NullOrNotBlank, String> {

        @Override
        public boolean isValid(String value, ConstraintValidatorContext validatorContext) {
            return value != null
                && value.length() != 0
                && !value.matches("^\\s*$");
        }
    }
}