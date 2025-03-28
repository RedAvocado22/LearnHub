package com.learnhub.common.dto;

import com.learnhub.course.Course;
import com.learnhub.course.category.Category;

import java.math.BigDecimal;
import java.util.List;

public record LandingPageResponse(Long studentCounted, Long teacherCounted, Long courseCounted,
                                  List<CourseResponse> courses) {
    public static record CourseResponse(Long id, String name, String image, BigDecimal price, Category category) {
        public static CourseResponse from(Course course) {
            return new CourseResponse(
                    course.getId(),
                    course.getName(),
                    course.getImage(),
                    course.getPrice(),
                    course.getCategory()
            );
        }
    }
}
