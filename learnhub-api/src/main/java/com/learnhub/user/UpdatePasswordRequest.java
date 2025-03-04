package com.learnhub.user;

import com.learnhub.constant.IConstant;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public record UpdatePasswordRequest(
        @NotEmpty
        String oldPassword,

        @NotEmpty
        @Pattern(regexp = IConstant.PASSWORD_REGEX, message = IConstant.PASSWORD_MSG)
        String newPassword
) {
}
