package com.learnhub.user;

public record UserResponse(Long id, String email, String firstname, String lastname, UserRole role) {

}
