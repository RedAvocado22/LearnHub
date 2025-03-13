package com.learnhub.common;

import java.util.HashMap;
import java.util.Map;
import com.learnhub.auth.exception.InactiveAccountException;
import com.learnhub.auth.exception.InvalidTokenException;
import com.learnhub.auth.exception.SuspendedAccountException;
import com.learnhub.auth.exception.UserExistsException;
import com.learnhub.common.dto.ErrorResponse;
import com.learnhub.user.exception.OldPasswordNotMatchedException;
import com.learnhub.user.exception.UserNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException e,
            HttpHeaders headers,
            HttpStatusCode status,
            WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        e.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError)error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });
        return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .body(ErrorResponse.builder().error(errors).build());
    }

    @ExceptionHandler(InactiveAccountException.class)
    public ResponseEntity<ErrorResponse> handleInactiveAccount(InactiveAccountException e) {
        return ResponseEntity
            .status(HttpStatus.ACCEPTED)
            .body(ErrorResponse.builder().error(e.getMessage()).build());
    }

    @ExceptionHandler(SuspendedAccountException.class)
    public ResponseEntity<ErrorResponse> handleSuspendedAccount(SuspendedAccountException e) {
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse.builder().error(e.getMessage()).build());
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserExists(UserExistsException e) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse.builder().error(e.getMessage()).build());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException e) {
        return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ErrorResponse.builder().error(e.getMessage()).build());
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ErrorResponse> handleInvalidToken(InvalidTokenException e) {
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse.builder().error(e.getMessage()).build());
    }

    @ExceptionHandler(OldPasswordNotMatchedException.class)
    public ResponseEntity<ErrorResponse> handleOldPasswordNotMatched(OldPasswordNotMatchedException e) {
        return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(ErrorResponse.builder().error(e.getMessage()).build());
    }
}
