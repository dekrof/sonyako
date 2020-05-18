package com.makeit.supported.validation;

import com.makeit.api.model.PasswordResetDto;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Target({ElementType.TYPE, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = MatchPassword.MatchPasswordValidator.class)
@Documented
public @interface MatchPassword {

    String message() default "The new passwords must match";

    Class<?>[] groups() default {};

    boolean allowNull() default false;

    Class<? extends Payload>[] payload() default {};

    final class MatchPasswordValidator implements ConstraintValidator<MatchPassword, PasswordResetDto> {

        private Boolean allowNull;

        @Override
        public void initialize(MatchPassword constraintAnnotation) {
            allowNull = constraintAnnotation.allowNull();
        }

        @Override
        public boolean isValid(PasswordResetDto value, ConstraintValidatorContext validatorContext) {
            var password = value.getPassword();
            var confirmPassword = value.getConfirmPassword();
            if (allowNull) {
                return null == password && null == confirmPassword;
            }
            return password.equals(confirmPassword);
        }
    }
}
