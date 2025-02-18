package com.learnhub.contact;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import com.learnhub.util.validation.Validator;

public record ContactRequest(
        @NotEmpty
        String firstName,

        @NotEmpty
        String lastName,

        @NotEmpty
        @Email
        String email,

        @NotEmpty
        @Pattern(regexp = Validator.PHONE_REGEX, message = Validator.PHONE_MSG)
        String phone,

        @NotEmpty
        String subject,

        @NotEmpty
        String message
) {

}
