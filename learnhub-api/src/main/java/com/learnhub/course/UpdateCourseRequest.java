package com.learnhub.course;

import java.math.BigDecimal;

public record UpdateCourseRequest(
        Long id,
        String name,
        Category category,
        BigDecimal price,
        CourseStatus status
) {}
