package com.learnhub.common;

import com.learnhub.course.Course;
import com.learnhub.course.CourseStatus;

public record ListCourseResponse(Long id, String name, CourseListResponse.CategoryResponse category, Double price,
                                 CourseStatus courseStatus, CourseListResponse.TeacherResponse teacher) {


    public static ListCourseResponse from(Course course) {
        return new ListCourseResponse(
                course.getId(),
                course.getName(),
                CourseListResponse.CategoryResponse.from(course.getCategory()),
                course.getPrice(),
                course.getStatus(),
                CourseListResponse.TeacherResponse.from(course.getTeacher()));
    }

}
