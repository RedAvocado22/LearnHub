package com.learnhub.course.dto;

import com.learnhub.course.CourseStatus;

public record ManagerCourseRequest(Long id, CourseStatus status) {
}
