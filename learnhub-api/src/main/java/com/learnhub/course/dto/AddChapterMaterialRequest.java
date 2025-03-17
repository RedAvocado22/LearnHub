package com.learnhub.course.dto;

import java.util.List;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import com.learnhub.course.MaterialType;

public record AddChapterMaterialRequest(
        @NotEmpty
        String name,

        @NotNull
        MaterialType type,

        @NotEmpty
        String description,

        AddQuizRequest quiz
) {
    public static record AddQuizRequest(@PositiveOrZero Integer passGrade, @NotEmpty List<QuestionRequest> questions) {
        public static record QuestionRequest(@NotEmpty String text, @NotEmpty String explanation, List<OptionRequest> options) {
            public static record OptionRequest(@NotEmpty String text, @NotNull Boolean correct) {}
        }
    }
}
