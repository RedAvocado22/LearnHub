package com.learnhub.course;

import com.learnhub.user.teacher.Teacher;

public record TeacherCourseListResponse(
        Long id,
        String name,
        CategoryResponse category,
        Double price,
        CourseStatus status,
        TeacherResponse teacher) {
    public record CategoryResponse(Long id, String name) {
        public static CategoryResponse from(Category category) {
            return new CategoryResponse(category.getId(), category.getName());
        }
    }

    public record TeacherResponse(Long id, String name) {
        public static TeacherResponse from(Teacher teacher) {
            return new TeacherResponse(teacher.getId(), teacher.getFirstName() + " " + teacher.getLastName());
        }
    }

    public static TeacherCourseListResponse from(Course course) {
        return new TeacherCourseListResponse(
                course.getId(),
                course.getName(),
                CategoryResponse.from(course.getCategory()),
                course.getPrice(),
                course.getStatus(),
                TeacherResponse.from(course.getTeacher())
        );
    }
}
