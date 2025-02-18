package com.learnhub.user.student;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record UpdateStudentRequest(
        @NotEmpty
        String firstName,

        @NotEmpty
        String lastName,

        @NotNull
        StudentType type
) {
}
