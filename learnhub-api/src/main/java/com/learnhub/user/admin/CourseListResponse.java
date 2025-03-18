package com.learnhub.user.admin;

import com.learnhub.course.Category;
import com.learnhub.course.Course;
import com.learnhub.course.CourseStatus;
import com.learnhub.user.teacher.Teacher;

public record CourseListResponse(Long id, String name, CategoryResponse category, Double price, CourseStatus status,
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

    public static CourseListResponse from(Course course) {
        return new CourseListResponse(
                course.getId(),
                course.getName(),
                CategoryResponse.from(course.getCategory()),
                course.getPrice(),
                course.getStatus(),
                TeacherResponse.from(course.getTeacher()));
    }
}
