package com.learnhub.user.teacher;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import com.learnhub.constant.IConstant;
import com.learnhub.user.UserRole;

public record AddTeacherRequest(
        @NotEmpty
        String firstName,

        @NotEmpty
        String lastName,

        @NotEmpty
        @Email
        String email,

        @NotEmpty
        @Pattern(regexp = IConstant.PHONE_REGEX, message = IConstant.PHONE_MSG)
        String phone,

        @NotNull
        UserRole role,

        @NotEmpty
        String major
) {
}
