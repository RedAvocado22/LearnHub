package com.learnhub.user.student;

import jakarta.validation.constraints.NotNull;

public record UpdateStudentRequest(
        String school,

        @NotNull
        StudentType type
) {
}
