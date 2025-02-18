package com.learnhub.user;

import jakarta.validation.constraints.NotEmpty;

public record UpdateUserRequest(
        @NotEmpty
        String firstName,

        @NotEmpty
        String lastName
) {
}
