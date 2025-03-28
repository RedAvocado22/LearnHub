package com.learnhub.course.dto;

import java.time.LocalDateTime;
import com.learnhub.course.Course;
import com.learnhub.course.CourseStatus;

public record ManagerCoursesResponse(Long id, String name, CourseStatus status, String teacherName, LocalDateTime createdAt) {
    public static ManagerCoursesResponse from(Course course) {
        return new ManagerCoursesResponse(
                course.getId(),
                course.getName(),
                course.getStatus(),
                course.getTeacher().getUser().getLastName() + " " + course.getTeacher().getUser().getFirstName(),
                course.getCreatedAt()
        );
    }
}
