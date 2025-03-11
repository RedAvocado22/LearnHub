package com.learnhub.common;

import java.util.List;

import com.learnhub.course.Category;
import com.learnhub.course.Course;
import com.learnhub.user.teacher.Teacher;

public record TeacherDetailsResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        String major,
        String phone,
        String website,
        String school,
        String address,
        String city,
        String about,
        List<CourseListResponse> courses
) {
    public record CourseListResponse(Long id, String name, CategoryResponse category, Float price) {
        public record CategoryResponse(Long id, String name) {
            public static CategoryResponse from(Category category) {
                return new CategoryResponse(category.getId(), category.getName());
            }
        }

        public static CourseListResponse from(Course course) {
            return new CourseListResponse(
                    course.getId(),
                    course.getName(),
                    CategoryResponse.from(course.getCategory()),
                    course.getPrice());
        }
    }

    public static TeacherDetailsResponse from(Teacher teacher) {
        return new TeacherDetailsResponse(
                teacher.getId(),
                teacher.getEmail(),
                teacher.getFirstName(),
                teacher.getLastName(),
                teacher.getMajor(),
                teacher.getPhone(),
                teacher.getWebsite(),
                teacher.getSchool(),
                teacher.getAddress(),
                teacher.getCity(),
                teacher.getAbout(),
                teacher.getCourses().stream().map(CourseListResponse::from).toList());
    }
}
