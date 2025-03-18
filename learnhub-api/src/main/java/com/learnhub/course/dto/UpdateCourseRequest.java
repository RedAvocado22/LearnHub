package com.learnhub.course.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.PositiveOrZero;
import com.learnhub.course.CourseStatus;

public record UpdateCourseRequest(
        String name,
        Long categoryId,
        @PositiveOrZero BigDecimal price,
        CourseStatus status,
        String description
) {
}
