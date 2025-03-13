package com.learnhub.contact.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import com.learnhub.constant.Validation;

public record AddContactRequest(
        @NotEmpty
        String firstName,

        @NotEmpty
        String lastName,

        @NotEmpty
        @Email
        String email,

        @NotEmpty
        @Pattern(regexp = Validation.PHONE_REGEX, message = Validation.PHONE_MSG)
        String phone,

        @NotEmpty
        String subject,

        @NotEmpty
        String message
) {}
