package com.learnhub.course.chapter.lesson.dto;

import jakarta.validation.constraints.NotBlank;

public record AddChapterRequest(@NotBlank String title) {
}
