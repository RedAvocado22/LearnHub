package com.learnhub.auth;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import com.learnhub.constant.Validation;

public record ResetPasswordRequest(
        @NotEmpty
        @Pattern(regexp = Validation.PASSWORD_REGEX, message = Validation.PASSWORD_MSG)
        String password,

        @NotEmpty
        String token
) {}
