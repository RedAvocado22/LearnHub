package com.learnhub.user.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import com.learnhub.constant.Validation;
import com.learnhub.user.student.StudentType;

public record UpdateUserRequest(
        @NotEmpty
        String firstName,

        @NotEmpty
        String lastName,

        UpdateStudentRequest student,
        UpdateTeacherRequest teacher
) {
    public static record UpdateStudentRequest(
            @NotNull
            StudentType type,

            String school
    ) {}

    public static record UpdateTeacherRequest(
            @NotEmpty
            String major,

            @NotEmpty
            @Pattern(regexp = Validation.PHONE_REGEX, message = Validation.PHONE_MSG)
            String phone,

            @NotEmpty
            String workAddress,

            @NotEmpty
            String city,

            String website,
            
            String biography
    ) {}
}
