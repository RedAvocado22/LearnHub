package com.learnhub.common.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.learnhub.course.Category;
import com.learnhub.course.Course;
import com.learnhub.user.teacher.TeacherProfile;

public record PublicCourseResponse(
        Long id,
        String name,
        String image,
        Category category,
        BigDecimal price,
        String description,
        TeacherResponse teacher,
        LocalDateTime createdAt
) {
    public static record TeacherResponse(Long id, String name) {
        public static TeacherResponse from(TeacherProfile teacher) {
            String fullName = teacher.getUser().getFirstName() + " " + teacher.getUser().getLastName();
            return new TeacherResponse(teacher.getId(), fullName);
        }
    }

    public static PublicCourseResponse from(Course course) {
        return new PublicCourseResponse(
                course.getId(),
                course.getName(),
                course.getImage(),
                course.getCategory(),
                course.getPrice(),
                course.getDescription(),
                TeacherResponse.from(course.getTeacher()),
                course.getCreatedAt());
    }
}
