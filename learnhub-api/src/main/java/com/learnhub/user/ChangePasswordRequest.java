package com.learnhub.user;

public record ChangePasswordRequest(String currentPassword, String newPassword, String confirmPassword) {
}
