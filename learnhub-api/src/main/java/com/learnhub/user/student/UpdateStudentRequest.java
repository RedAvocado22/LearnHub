package com.learnhub.user.student;

import jakarta.validation.constraints.NotEmpty;

public record UpdateStudentRequest(
        String school,

        @NotEmpty
        StudentType type
) {
}
