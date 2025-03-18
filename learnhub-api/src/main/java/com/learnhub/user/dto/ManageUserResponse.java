package com.learnhub.user.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import com.learnhub.course.Category;
import com.learnhub.course.Course;
import com.learnhub.course.CourseStatus;
import com.learnhub.user.User;
import com.learnhub.user.UserDocument;
import com.learnhub.user.UserRole;
import com.learnhub.user.UserStatus;
import com.learnhub.user.student.StudentProfile;
import com.learnhub.user.student.StudentType;
import com.learnhub.user.teacher.TeacherProfile;

public record ManageUserResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        UserRole role,
        UserStatus status,
        ManageStudentResponse student,
        ManageTeacherResponse teacher,
        List<UserDocumentResponse> documents,
        LocalDateTime createdAt
) {
    public static record ManageStudentResponse(StudentType type, String school) {
        public static ManageStudentResponse from(StudentProfile student) {
            return new ManageStudentResponse(student.getType(), student.getSchool());
        }
    }
    public static record ManageTeacherResponse(
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
                        course.getCreatedAt(),
                        course.getUpdatedAt(),
                        course.getCancelledAt(),
                        course.getArchivedAt());
            }
        }

        public static ManageTeacherResponse from(TeacherProfile teacher) {
            return new ManageTeacherResponse(
                    teacher.getMajor(),
                    teacher.getPhone(),
                    teacher.getWorkAddress(),
                    teacher.getCity(),
                    teacher.getWebsite(),
                    teacher.getBiography(),
                    teacher.getCourses().stream().map(TeacherCourseResponse::from).toList());
        }
    }

    public static record UserDocumentResponse(String fileName, Long fileSize, String downloadLink) {
        public static UserDocumentResponse from(UserDocument doc) {
            return new UserDocumentResponse(
                    doc.getFileName(),
                    doc.getFileSize(),
                    doc.getDownloadLink());
        }
    }

    public static ManageUserResponse from(User user) {
        if (user.getRole() == UserRole.STUDENT && user.getStudent() != null) {
            return new ManageUserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    user.getStatus(),
                    ManageStudentResponse.from(user.getStudent()),
                    null,
                    user.getDocuments().stream().map(UserDocumentResponse::from).toList(),
                    user.getCreatedAt());
        } else if (user.getRole() == UserRole.TEACHER && user.getTeacher() != null) {
            return new ManageUserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    user.getStatus(),
                    null,
                    ManageTeacherResponse.from(user.getTeacher()),
                    user.getDocuments().stream().map(UserDocumentResponse::from).toList(),
                    user.getCreatedAt());
        }
        return new ManageUserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getStatus(),
                null,
                null,
                user.getDocuments().stream().map(UserDocumentResponse::from).toList(),
                user.getCreatedAt());
    }
}
