package com.learnhub.user;

import com.learnhub.constant.IConstant;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public record UpdateUserRequest(
        @NotEmpty
        String firstName,

        @NotEmpty
        String lastName,

        @NotEmpty
        @Pattern(regexp = IConstant.PHONE_REGEX, message = IConstant.PHONE_MSG)
        String phone,

        @NotEmpty
        String address,

        @NotEmpty
        String city
) {
}
