package com.makeit.supported.advice;

import com.makeit.api.exception.AppException;
import com.makeit.api.exception.BadRequestException;
import com.makeit.api.exception.InvalidTokenRequestException;
import com.makeit.api.exception.MailSendException;
import com.makeit.api.exception.PasswordResetException;
import com.makeit.api.exception.PasswordResetLinkException;
import com.makeit.api.exception.ResourceAlreadyInUseException;
import com.makeit.api.exception.ResourceNotFoundException;
import com.makeit.api.exception.TokenRefreshException;
import com.makeit.api.exception.UpdatePasswordException;
import com.makeit.api.exception.UserLoginException;
import com.makeit.api.exception.UserLogoutException;
import com.makeit.api.exception.UserRegistrationException;
import com.makeit.api.model.ApiResponse;
import lombok.extern.slf4j.*;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

import javax.inject.Inject;
import javax.validation.ConstraintViolationException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author sonnyako <Makydon Sofiia>
 * @version 1.0.0
 * @since 1.0.0
 */
@Slf4j
@RestControllerAdvice
public class ExceptionHandlingAdvice {

    private final MessageSource messageSource;

    @Inject
    public ExceptionHandlingAdvice(MessageSource messageSource) {
        this.messageSource = messageSource;
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiResponse<List<String>> processValidationError(MethodArgumentNotValidException ex, WebRequest request) {
        return ApiResponse.<List<String>>error()
            .cause(ex.getClass().getName())
            .data(processAllErrors(ex.getBindingResult().getAllErrors()))
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = AppException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public ApiResponse<String> handleAppException(AppException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = ResourceAlreadyInUseException.class)
    @ResponseStatus(HttpStatus.IM_USED)
    @ResponseBody
    public ApiResponse<String> handleResourceAlreadyInUseException(ResourceAlreadyInUseException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ApiResponse<String> handleResourceNotFoundException(ResourceNotFoundException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = BadRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public ApiResponse<String> handleBadRequestException(BadRequestException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = UsernameNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ApiResponse<String> handleUsernameNotFoundException(UsernameNotFoundException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = UserLoginException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    @ResponseBody
    public ApiResponse<String> handleUserLoginException(UserLoginException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = BadCredentialsException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    @ResponseBody
    public ApiResponse<String> handleBadCredentialsException(BadCredentialsException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = UserRegistrationException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    @ResponseBody
    public ApiResponse<String> handleUserRegistrationException(UserRegistrationException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = PasswordResetLinkException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    @ResponseBody
    public ApiResponse<String> handlePasswordResetLinkException(PasswordResetLinkException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = PasswordResetException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    @ResponseBody
    public ApiResponse<String> handlePasswordResetException(PasswordResetException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = MailSendException.class)
    @ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
    @ResponseBody
    public ApiResponse<String> handleMailSendException(MailSendException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = InvalidTokenRequestException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    @ResponseBody
    public ApiResponse<String> handleInvalidTokenException(InvalidTokenRequestException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = UpdatePasswordException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    @ResponseBody
    public ApiResponse<String> handleUpdatePasswordException(UpdatePasswordException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }


    @ExceptionHandler(value = TokenRefreshException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    @ResponseBody
    public ApiResponse<String> handleTokenRefreshException(TokenRefreshException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = UserLogoutException.class)
    @ResponseStatus(HttpStatus.EXPECTATION_FAILED)
    @ResponseBody
    public ApiResponse<String> handleUserLogoutException(UserLogoutException ex, WebRequest request) {
        return ApiResponse.<String>error()
            .cause(ex.getClass().getName())
            .data(ex.getMessage())
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    @ResponseBody
    public ApiResponse<Map<String, List<String>>> handleValidationException(ConstraintViolationException ex, WebRequest request) {
        var violations = ex.getConstraintViolations().stream()
            .collect(Collectors.groupingBy(
                violation -> violation.getPropertyPath().toString(),
                Collectors.mapping(violation -> violation.getMessage(), Collectors.toList())
            ));

        return ApiResponse.<Map<String, List<String>>>error()
            .cause(ex.getClass().getName())
            .data(violations)
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    @ExceptionHandler(value = SQLIntegrityConstraintViolationException.class)
    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    @ResponseBody
    public ApiResponse<Map<String, List<String>>> handleSqlException(SQLIntegrityConstraintViolationException ex, WebRequest request) {
        String sqlState = ex.getSQLState();

        return ApiResponse.<Map<String, List<String>>>error()
            .cause(ex.getClass().getName())
            .data(Map.of("State", List.of(sqlState)))
            .path(resolvePathFromWebRequest(request))
            .build();
    }

    /**
     * Utility Method to generate a localized message for the list of field errors
     *
     * @param allErrors the field errors
     * @return the list
     */
    private List<String> processAllErrors(List<ObjectError> allErrors) {
        return allErrors.stream().map(this::resolveLocalizedErrorMessage).collect(Collectors.toList());
    }

    /**
     * Resolve localized error message. Utility method to generate a localized error message.
     *
     * @param objectError the field error
     * @return the string
     */
    private String resolveLocalizedErrorMessage(ObjectError objectError) {
        var currentLocale = LocaleContextHolder.getLocale();
        var localizedErrorMessage = messageSource.getMessage(objectError, currentLocale);

        LOGGER.info(localizedErrorMessage);
        return localizedErrorMessage;
    }

    private String resolvePathFromWebRequest(WebRequest request) {
        try {
            return ((ServletWebRequest) request).getRequest()
                .getAttribute("javax.servlet.forward.request_uri")
                .toString();
        } catch (Exception ex) {
            return null;
        }
    }
}
