package com.learnhub.course.dto;

import java.time.LocalDateTime;
import com.learnhub.course.Course;
import com.learnhub.course.CourseStatus;
import com.learnhub.course.category.Category;
import com.learnhub.user.manager.ManagerProfile;

public record AdminCourseResponse(
        Long id,
        String name,
        String teacherEmail,
        Category category,
        CourseStatus status,
        LocalDateTime createdAt,
        ManagerResponse manager) {
    static record ManagerResponse(String name) {
        public static ManagerResponse from(ManagerProfile managerProfile) {
            if (managerProfile == null) {
                return null;
            }
            return new ManagerResponse(
                    managerProfile.getUser().getFirstName() + " " + managerProfile.getUser().getLastName()
            );
        }
    }

    public static AdminCourseResponse from(Course course) {
        return new AdminCourseResponse(
                course.getId(),
                course.getName(),
                course.getTeacher().getUser().getEmail(),
                course.getCategory(),
                course.getStatus(),
                course.getCreatedAt(),
                course.getManager() != null ? ManagerResponse.from(course.getManager()) : null
        );
    }
}
