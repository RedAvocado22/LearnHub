package com.learnhub.user.teacher;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import com.learnhub.util.validation.Validator;

public record UpdateTeacherRequest(
        @NotEmpty
        String firstName,

        @NotEmpty
        String lastName,

        @NotEmpty
        String major,

        @NotEmpty
        @Pattern(regexp = Validator.PHONE_REGEX, message = Validator.PHONE_MSG)
        String phone,

        @NotEmpty
        String address,

        @NotEmpty
        String city,

        @NotEmpty
        String country
) {
}
