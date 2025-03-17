package com.learnhub.course.dto;

import com.learnhub.course.category.Category;
import com.learnhub.course.CourseStatus;

import java.math.BigDecimal;

public record UpdateCourseRequest(
        Long id,
        String name,
        Category category,
        BigDecimal price,
        CourseStatus status
) {
}
