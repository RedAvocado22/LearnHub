package com.learnhub.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import com.learnhub.constant.IConstant;

public record AddContactRequest(
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

        @NotEmpty
        String subject,

        @NotEmpty
        String message
) {
}
