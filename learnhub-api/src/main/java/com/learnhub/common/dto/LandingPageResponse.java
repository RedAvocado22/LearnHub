package com.learnhub.common.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.learnhub.course.Course;
import com.learnhub.course.category.Category;
import com.learnhub.course.review.Review;

public record LandingPageResponse(Long studentCounted, Long teacherCounted, Long courseCounted, List<CourseResponse> courses) {
    public static record CourseResponse(Long id, String name, String image, BigDecimal price, List<ReviewResponse> reviews, Category category) {
        static record ReviewResponse(Long id, String reviewer, int star, String comment, Long user, Long course, LocalDateTime submittedAt) {
            public static ReviewResponse from(Review review) {
                return new ReviewResponse(
                        review.getId(),
                        review.getUser().getFullName(),
                        review.getStar(),
                        review.getComment(),
                        review.getUser().getId(),
                        review.getCourse().getId(),
                        review.getCreatedAt()
                );
            }
        }
        public static CourseResponse from(Course course) {
            return new CourseResponse(
                    course.getId(),
                    course.getName(),
                    course.getImage(),
                    course.getPrice(),
                    course.getReviews().stream().map(ReviewResponse::from).toList(),
                    course.getCategory()
            );
        }
    }
}
