package com.learnhub.user;

import java.time.LocalDateTime;
import java.util.List;
import com.learnhub.course.Category;
import com.learnhub.course.Course;
import com.learnhub.course.CourseStatus;
import com.learnhub.user.student.Student;
import com.learnhub.user.student.StudentType;
import com.learnhub.user.teacher.Teacher;

public record UserResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        UserRole role,
        UserDetailsResponse details
) {
    public sealed interface UserDetailsResponse permits StudentResponse, TeacherResponse {}

    public record StudentResponse(StudentType studentType, String school) implements UserDetailsResponse {
        public static StudentResponse from(Student student) {
            return new StudentResponse(student.getType(), student.getSchool());
        }
    }

    public record TeacherResponse(
            String major,
            String phone,
            String school,
            String address,
            String city,
            List<CourseResponse> courses
    ) implements UserDetailsResponse {
        public record CourseResponse(
                Long id,
                String name,
                Category category,
                Double price,
                CourseStatus status,
                String description,
                LocalDateTime createdAt,
                LocalDateTime updatedAt,
                LocalDateTime cancelledAt,
                LocalDateTime archivedAt
        ) {
            public static CourseResponse from(Course course) {
                return new CourseResponse(
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
        public static TeacherResponse from(Teacher teacher) {
            return new TeacherResponse(
                    teacher.getMajor(),
                    teacher.getPhone(),
                    teacher.getSchool(),
                    teacher.getAddress(),
                    teacher.getCity(),
                    teacher.getCourses().stream().map(course -> CourseResponse.from(course)).toList());
        }
    }

    public static UserResponse from(User user) {
        UserDetailsResponse details = null;
        if (user.getRole() == UserRole.STUDENT && user instanceof Student student) {
            details = StudentResponse.from(student);
        }
        if (user.getRole() == UserRole.TEACHER && user instanceof Teacher teacher) {
            details = TeacherResponse.from(teacher);
        }
        return new UserResponse(user.getId(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getRole(), details);
    }
}
