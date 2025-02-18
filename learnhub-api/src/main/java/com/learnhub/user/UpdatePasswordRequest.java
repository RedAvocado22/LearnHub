package com.learnhub.user;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import com.learnhub.util.validation.Validator;

public record UpdatePasswordRequest(
        @NotEmpty
        String oldPassword,

        @NotEmpty
        @Pattern(regexp = Validator.PASSWORD_REGEX, message = Validator.PASSWORD_MSG)
        String newPassword
) {
}
