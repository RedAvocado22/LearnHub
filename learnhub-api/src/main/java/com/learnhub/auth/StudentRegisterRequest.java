package com.learnhub.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import com.learnhub.user.student.StudentType;
import com.learnhub.util.validation.Validator;


public record StudentRegisterRequest(
        @NotEmpty
        @Email
        String email,

        @NotEmpty
        String firstname,

        @NotEmpty
        String lastname,

        @NotEmpty
        @Pattern(regexp = Validator.PASSWORD_REGEX, message = Validator.PASSWORD_MSG)
        String password,

        @NotNull
        StudentType studentType
) {
}
