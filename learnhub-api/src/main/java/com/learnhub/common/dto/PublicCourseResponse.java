package com.learnhub.common.dto;

import com.learnhub.course.Course;
import com.learnhub.course.category.Category;
import com.learnhub.course.chapter.Chapter;
import com.learnhub.course.chapter.ChapterMaterial;
import com.learnhub.course.chapter.MaterialType;
import com.learnhub.course.review.Review;
import com.learnhub.user.teacher.TeacherProfile;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record PublicCourseResponse(
        Long id,
        String name,
        String image,
        Category category,
        BigDecimal price,
        String description,
        TeacherResponse teacher,
        List<ReviewResponse> reviews,
        List<ChapterResponse> chapters,
        LocalDateTime createdAt
) {
    static record TeacherResponse(Long id, String name) {
        public static TeacherResponse from(TeacherProfile teacher) {
            String fullName = teacher.getUser().getFirstName() + " " + teacher.getUser().getLastName();
            return new TeacherResponse(teacher.getId(), fullName);
        }
    }

    static record ReviewResponse(Long id, String reviewer, int star, String comment, Long user, Long course) {
        public static ReviewResponse from(Review review) {
            return new ReviewResponse(
                    review.getId(),
                    review.getUser().getUsername(),
                    review.getStar(),
                    review.getComment(),
                    review.getUser().getId(),
                    review.getCourse().getId()
            );
        }
    }

    static record ChapterResponse(Long id, String name,
                                  List<ChapterResponse.ChapterMaterialResponse> materials) {
        static record ChapterMaterialResponse(
                Long id,
                String name,
                MaterialType type,
                String description
        ) {
            public static ChapterMaterialResponse from(ChapterMaterial material) {
                return new ChapterResponse.ChapterMaterialResponse(
                        material.getId(),
                        material.getName(),
                        material.getType(),
                        material.getDescription()
                );
            }
        }

        public static ChapterResponse from(Chapter chapter) {
            return new ChapterResponse(
                    chapter.getId(),
                    chapter.getTitle(),
                    chapter.getMaterials().stream().map(ChapterMaterialResponse::from).toList());
        }
    }

    public static PublicCourseResponse from(Course course) {
        return new PublicCourseResponse(
                course.getId(),
                course.getName(),
                course.getImage(),
                course.getCategory(),
                course.getPrice(),
                course.getDescription(),
                TeacherResponse.from(course.getTeacher()),
                course.getReviews().stream().map(ReviewResponse::from).toList(),
                course.getChapters().stream().map(ChapterResponse::from).toList(),
                course.getCreatedAt());
    }
}
