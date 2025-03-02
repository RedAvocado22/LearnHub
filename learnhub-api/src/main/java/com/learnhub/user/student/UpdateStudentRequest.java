package com.learnhub.user.student;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record UpdateStudentRequest(
        @NotEmpty
        String school,

        @NotNull
        StudentType type
) {
}
