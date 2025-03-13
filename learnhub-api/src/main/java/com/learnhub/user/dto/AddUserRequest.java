package com.learnhub.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import com.learnhub.constant.Validation;
import com.learnhub.user.UserRole;
import com.learnhub.user.student.StudentType;

public record AddUserRequest(
        @NotEmpty
        @Email
        String email,

        @NotEmpty
        String firstName,

        @NotEmpty
        String lastName,

        @NotNull
        UserRole role,

        AddStudentRequest student,
        AddTeacherRequest teacher
) {
    public static record AddStudentRequest(
            @NotNull
            StudentType type,

            @NotEmpty
            String school
    ) {}
    public static record AddTeacherRequest(
            @NotEmpty
            String major,

            @NotEmpty
            @Pattern(regexp = Validation.PHONE_REGEX, message = Validation.PHONE_MSG)
            String phone,

            @NotEmpty
            String workAddress,

            @NotEmpty
            String city
    ) {}
}
