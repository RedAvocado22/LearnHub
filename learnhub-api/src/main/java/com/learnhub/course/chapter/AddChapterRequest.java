package com.learnhub.course.chapter;

import jakarta.validation.constraints.NotBlank;

public record AddChapterRequest(@NotBlank String title) {
}
