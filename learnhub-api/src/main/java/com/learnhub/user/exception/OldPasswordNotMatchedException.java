package com.learnhub.user.exception;

public class OldPasswordNotMatchedException extends RuntimeException {
    public OldPasswordNotMatchedException(String message) {
        super(message);
    }
}
