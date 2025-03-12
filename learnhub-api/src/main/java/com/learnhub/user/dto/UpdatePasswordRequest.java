package com.learnhub.user.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import com.learnhub.constant.Validation;

public record UpdatePasswordRequest(
        @NotEmpty
        String oldPassword,

        @NotEmpty
        @Pattern(regexp = Validation.PASSWORD_REGEX, message = Validation.PASSWORD_MSG)
        String newPassword
) {}
