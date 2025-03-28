package com.learnhub.course.review;

import com.learnhub.common.exception.ResourceNotFoundException;
import com.learnhub.course.Course;
import com.learnhub.course.CourseRepository;
import com.learnhub.course.dto.ReviewRequest;
import com.learnhub.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, CourseRepository courseRepository) {
        this.reviewRepository = reviewRepository;
        this.courseRepository = courseRepository;
    }

    public Review save(User user, Long courseId, ReviewRequest req) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        return reviewRepository.save(
                Review.builder()
                        .user(user)
                        .course(course)
                        .comment(req.comment())
                        .star(req.star())
                        .updatedAt(LocalDateTime.now())
                        .build()
        );
    }

    public List<Review> findAllByCourseId(Long courseId) {
        return reviewRepository.findByCourseId(courseId);
    }
}
