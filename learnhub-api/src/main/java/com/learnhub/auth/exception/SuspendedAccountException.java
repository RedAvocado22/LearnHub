package com.learnhub.auth.exception;

public class SuspendedAccountException extends RuntimeException {
    public SuspendedAccountException(String message) {
        super(message);
    }
}
