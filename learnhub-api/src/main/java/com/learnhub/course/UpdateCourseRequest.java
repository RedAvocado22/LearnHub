package com.learnhub.course;

import jakarta.validation.constraints.NotEmpty;

public record UpdateCourseRequest(Long id, CourseStatus status) {
}