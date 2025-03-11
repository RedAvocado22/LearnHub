package com.learnhub.auth;

import com.learnhub.constant.IConstant;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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
        @Pattern(regexp = IConstant.PASSWORD_REGEX, message = IConstant.PASSWORD_MSG)
        String password,

        @NotNull
        StudentType studentType
) {
}
