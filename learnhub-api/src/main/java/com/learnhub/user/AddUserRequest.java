package com.learnhub.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import com.learnhub.constant.IConstant;

public record AddUserRequest(
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
        UserRole role
) {
}
