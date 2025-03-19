package com.learnhub.common;

import com.learnhub.common.dto.PublicCourseResponse;
import com.learnhub.course.Course;
import com.learnhub.course.CourseStatus;

import java.math.BigDecimal;

public record ListCourseResponse(Long id, String name, BigDecimal price,
                                 CourseStatus courseStatus, PublicCourseResponse.TeacherResponse teacher) {


    public static ListCourseResponse from(Course course) {
        return new ListCourseResponse(
                course.getId(),
                course.getName(),
                course.getPrice(),
                course.getStatus(),
                PublicCourseResponse.TeacherResponse.from(course.getTeacher()));
    }

}
