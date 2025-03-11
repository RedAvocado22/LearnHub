package com.learnhub.user.teacher;

import jakarta.validation.constraints.NotEmpty;

public record UpdateTeacherRequest(
        @NotEmpty
        String major,

        @NotEmpty
        String website,

        @NotEmpty
        String about,

        String school
) {
}
