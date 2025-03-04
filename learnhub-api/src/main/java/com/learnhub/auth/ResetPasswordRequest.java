package com.learnhub.auth;

import com.learnhub.constant.IConstant;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public record ResetPasswordRequest(
        @NotEmpty
        @Pattern(regexp = IConstant.PASSWORD_REGEX, message = IConstant.PASSWORD_MSG)
        String password,
        @NotEmpty String token
) {
}
