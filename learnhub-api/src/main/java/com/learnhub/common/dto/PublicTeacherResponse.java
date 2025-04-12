package com.learnhub.common.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.learnhub.course.Course;
import com.learnhub.course.CourseStatus;
import com.learnhub.course.category.Category;
import com.learnhub.course.review.Review;
import com.learnhub.user.User;

public record PublicTeacherResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        String major,
        String avatar,
        String phone,
        String workAddress,
        String city,
        String website,
        String biography,
        List<TeacherCourseResponse> courses,
        LocalDateTime joinedAt
) {
    public static record TeacherCourseResponse(Long id, String name, Category category, String image, BigDecimal price, List<ReviewResponse> reviews) {
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
        public static TeacherCourseResponse from(Course course) {
            return new TeacherCourseResponse(
                    course.getId(),
                    course.getName(),
                    course.getCategory(),
                    course.getImage(),
                    course.getPrice(),
                    course.getReviews().stream().map(ReviewResponse::from).toList());
        }
    }

    public static PublicTeacherResponse from(User user) {
        return new PublicTeacherResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getTeacher().getMajor(),
                user.getAvatar(),
                user.getTeacher().getPhone(),
                user.getTeacher().getWorkAddress(),
                user.getTeacher().getCity(),
                user.getTeacher().getWebsite(),
                user.getTeacher().getBiography(),
                user.getTeacher().getCourses().stream()
                        .filter(course -> course.getStatus() == CourseStatus.PUBLIC)
                        .map(TeacherCourseResponse::from).toList(),
                user.getCreatedAt());
    }
}
