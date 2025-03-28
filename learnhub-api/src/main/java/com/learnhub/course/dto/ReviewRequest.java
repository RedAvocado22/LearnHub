package com.learnhub.course.dto;

import jakarta.validation.constraints.NotEmpty;

public record ReviewRequest(
        @NotEmpty
        Long id,

        @NotEmpty
        int star,

        @NotEmpty
        String comment) {
}