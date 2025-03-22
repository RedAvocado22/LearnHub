package com.learnhub.course.chapter.lesson.dto;

import java.util.List;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record UpdateChapterMaterialRequest(String name, String description, UpdateQuizRequest quiz) {
    public static record UpdateQuizRequest(@PositiveOrZero Integer passGrade, @NotEmpty List<QuestionRequest> questions) {
        public static record QuestionRequest(@NotEmpty String text, @NotEmpty String explanation, List<OptionRequest> options) {
            public static record OptionRequest(@NotEmpty String text, @NotNull Boolean correct) {}
        }
    }
}
