package com.learnhub.auth.exception;

public class InactiveAccountException extends RuntimeException {
    public InactiveAccountException(String message) {
        super(message);
    }
}
