package com.learnhub.auth;

import com.learnhub.user.student.StudentType;

public record StudentRegisterRequest(
        String email,
        String firstname,
        String lastname,
        String password,
        StudentType studentType) {
}
