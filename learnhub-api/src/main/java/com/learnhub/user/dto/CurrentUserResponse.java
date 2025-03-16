package com.learnhub.user.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.learnhub.course.Category;
import com.learnhub.course.Course;
import com.learnhub.course.CourseStatus;
import com.learnhub.user.User;
import com.learnhub.user.UserRole;
import com.learnhub.user.UserStatus;
import com.learnhub.user.student.StudentProfile;
import com.learnhub.user.student.StudentType;
import com.learnhub.user.teacher.TeacherProfile;

public record CurrentUserResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        UserRole role,
        UserStatus status,
        CurrentStudentResponse student,
        CurrentTeacherResponse teacher,
        LocalDateTime createdAt
) {
    public static record CurrentStudentResponse(StudentType type, String school) {
        public static CurrentStudentResponse from(StudentProfile student) {
            return new CurrentStudentResponse(student.getType(), student.getSchool());
        }
    }

    public static record CurrentTeacherResponse(
            String major,
            String phone,
            String workAddress,
            String city,
            String website,
            String biography,
            List<TeacherCourseResponse> courses
    ) {
        public static record TeacherCourseResponse(
                Long id,
                String name,
                Category category,
                BigDecimal price,
                CourseStatus status,
                String description,
                String image,
                LocalDateTime createdAt,
                LocalDateTime updatedAt,
                LocalDateTime cancelledAt,
                LocalDateTime archivedAt
        ) {
            public static TeacherCourseResponse from(Course course) {
                return new TeacherCourseResponse(
                        course.getId(),
                        course.getName(),
                        course.getCategory(),
                        course.getPrice(),
                        course.getStatus(),
                        course.getDescription(),
                        course.getImage(),
                        course.getCreatedAt(),
                        course.getUpdatedAt(),
                        course.getCancelledAt(),
                        course.getArchivedAt());
            }
        }

        public static CurrentTeacherResponse from(TeacherProfile teacher) {
            return new CurrentTeacherResponse(
                    teacher.getMajor(),
                    teacher.getPhone(),
                    teacher.getWorkAddress(),
                    teacher.getCity(),
                    teacher.getWebsite(),
                    teacher.getBiography(),
                    teacher.getCourses().stream().map(TeacherCourseResponse::from).toList());
        }
    }

    public static CurrentUserResponse from(User user) {
        if (user.getRole() == UserRole.STUDENT && user.getStudent() != null) {
            return new CurrentUserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    user.getStatus(),
                    CurrentStudentResponse.from(user.getStudent()),
                    null,
                    user.getCreatedAt());
        } else if (user.getRole() == UserRole.TEACHER && user.getTeacher() != null) {
            return new CurrentUserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    user.getStatus(),
                    null,
                    CurrentTeacherResponse.from(user.getTeacher()),
                    user.getCreatedAt());
        }
        return new CurrentUserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getStatus(),
                null,
                null,
                user.getCreatedAt());
    }
}
