package com.learnhub.user;


public record ChangePasswordRequest(String oldpassword, String newpassword, String repassword) {
}
