package com.learnhub.course.dto;

import com.learnhub.course.Course;
import com.learnhub.course.CourseStatus;

import java.time.LocalDateTime;

public record ManagerCoursesResponse(Long id, String name, CourseStatus status, LocalDateTime createdAt) {
    public static ManagerCoursesResponse from(Course course) {
        return new ManagerCoursesResponse(
                course.getId(),
                course.getName(),
                course.getStatus(),
                course.getCreatedAt()
        );
    }
}
