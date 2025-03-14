package com.learnhub.course;

public record UpdateCourseRequest(Long id,
                                  String name,
                                  Category category,
                                  Double price,
                                  CourseStatus status) {
}
