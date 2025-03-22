package com.learnhub.enrollment.dto;

import java.util.List;
import jakarta.validation.constraints.NotEmpty;

public record GradeQuizRequest(@NotEmpty List<QuestionRequest> questions) {
    public static record QuestionRequest(Long id, @NotEmpty List<OptionRequest> answers) {
        public static record OptionRequest(Long id, Boolean chosen) {}
    }
}
