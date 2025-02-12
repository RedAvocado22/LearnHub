package com.learnhub.auth;

public record ResetPasswordRequest(String password, String token) {
}
