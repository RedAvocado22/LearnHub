package com.learnhub.course.dto;

import com.learnhub.course.Course;
import com.learnhub.course.CourseStatus;
import com.learnhub.course.category.Category;
import com.learnhub.user.manager.ManagerProfile;
import com.learnhub.user.teacher.TeacherProfile;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record AdminCourseResponse(
        Long id,
        String name,
        BigDecimal price,
        TeacherResponse teacher,
        Category category,
        CourseStatus status,
        String description,
        LocalDateTime createdAt,
        ManagerResponse manager) {
    static record TeacherResponse(String name, String image) {
        public static TeacherResponse from(TeacherProfile teacherProfile) {
            return new TeacherResponse(
                    teacherProfile.getUser().getFirstName() + " " + teacherProfile.getUser().getLastName(),
                    teacherProfile.getUser().getAvatar()
            );
        }
    }

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
                course.getPrice(),
                TeacherResponse.from(course.getTeacher()),
                course.getCategory(),
                course.getStatus(),
                course.getDescription(),
                course.getCreatedAt(),
                course.getManager() != null ? ManagerResponse.from(course.getManager()) : null
        );
    }
}