package com.learnhub.common;

import com.learnhub.auth.exception.InactiveAccountException;
import com.learnhub.auth.exception.RefreshTokenException;
import com.learnhub.auth.exception.UserExistsException;
import com.learnhub.user.exception.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(InactiveAccountException.class)
    public ResponseEntity<ErrorResponse> handleInactiveAccountException(InactiveAccountException e) {
        ErrorResponse err = new ErrorResponse(HttpStatus.ACCEPTED, e.getMessage());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(err);
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserExistsException(UserExistsException e) {
        ErrorResponse err = new ErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException e) {
        ErrorResponse err = new ErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }

    @ExceptionHandler(RefreshTokenException.class)
    public ResponseEntity<ErrorResponse> handleRefreshTokenException(RefreshTokenException e) {
        ErrorResponse err = new ErrorResponse(HttpStatus.NOT_FOUND, e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(err);
    }
}
