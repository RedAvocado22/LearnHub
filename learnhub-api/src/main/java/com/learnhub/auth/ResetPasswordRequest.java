package com.learnhub.auth;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import com.learnhub.util.validation.Validator;

public record ResetPasswordRequest(
        @NotEmpty
        @Pattern(regexp = Validator.PASSWORD_REGEX, message = Validator.PASSWORD_MSG)
        String password,
        @NotEmpty String token
) {
}
