package com.learnhub.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import com.learnhub.constant.Validation;
import com.learnhub.user.student.StudentType;

public record StudentRegisterRequest(
        @NotEmpty
        @Email
        String email,

        @NotEmpty
        String firstname,

        @NotEmpty
        String lastname,

        @NotEmpty
        @Pattern(regexp = Validation.PASSWORD_REGEX, message = Validation.PASSWORD_MSG)
        String password,

        @NotNull
        StudentType studentType
) {}
