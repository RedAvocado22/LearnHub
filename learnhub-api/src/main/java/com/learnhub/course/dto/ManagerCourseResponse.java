package com.learnhub.course.dto;

import com.learnhub.course.Course;
import com.learnhub.course.CourseStatus;
import com.learnhub.course.category.Category;
import com.learnhub.course.chapter.Chapter;
import com.learnhub.course.chapter.ChapterMaterial;
import com.learnhub.course.chapter.MaterialType;
import com.learnhub.course.chapter.lesson.Lesson;
import com.learnhub.course.chapter.lesson.LessonMaterial;
import com.learnhub.course.chapter.quiz.Option;
import com.learnhub.course.chapter.quiz.Question;
import com.learnhub.course.chapter.quiz.Quiz;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;


public record ManagerCourseResponse(
        Long id,
        String name,
        Category category,
        BigDecimal price,
        CourseStatus status,
        String description,
        String image,
        List<ChapterResponse> chapters,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime cancelledAt,
        LocalDateTime archivedAt
) {
    static record ChapterResponse(Long id, String name, List<ChapterMaterialResponse> materials) {
        static record ChapterMaterialResponse(
                Long id,
                String name,
                MaterialType type,
                String description,
                LessonResponse lesson,
                QuizResponse quiz
        ) {
            static record LessonResponse(String videoUrl, List<MaterialResponse> materials) {
                static record MaterialResponse(Long id, String name, String fileUrl) {
                    public static MaterialResponse from(LessonMaterial material) {
                        return new MaterialResponse(material.getId(), material.getName(), material.getFileUrl());
                    }
                }

                public static LessonResponse from(Lesson lesson) {
                    return new LessonResponse(
                            lesson.getVideoUrl(),
                            lesson.getMaterials().stream().map(MaterialResponse::from).toList());
                }
            }

            static record QuizResponse(Integer passGrade, List<QuestionResponse> questions) {
                static record QuestionResponse(String text, String explanation, List<OptionResponse> options) {
                    static record OptionResponse(String text, Boolean correct) {
                        public static OptionResponse from(Option option) {
                            return new OptionResponse(option.getText(), option.getCorrect());
                        }
                    }

                    public static QuestionResponse from(Question question) {
                        return new QuestionResponse(
                                question.getText(),
                                question.getExplanation(),
                                question.getOptions().stream().map(OptionResponse::from).toList());
                    }
                }

                public static QuizResponse from(Quiz quiz) {
                    return new QuizResponse(
                            quiz.getPassGrade(),
                            quiz.getQuestions().stream().map(QuestionResponse::from).toList());
                }
            }

            public static ChapterMaterialResponse from(ChapterMaterial material) {
                if (material.getType() == MaterialType.LESSON && material.getLesson() != null) {
                    return new ChapterMaterialResponse(
                            material.getId(),
                            material.getName(),
                            material.getType(),
                            material.getDescription(),
                            LessonResponse.from(material.getLesson()),
                            null);
                } else if (material.getType() == MaterialType.QUIZ && material.getQuiz() != null) {
                    return new ChapterMaterialResponse(
                            material.getId(),
                            material.getName(),
                            material.getType(),
                            material.getDescription(),
                            null,
                            QuizResponse.from(material.getQuiz()));
                }
                return new ChapterResponse.ChapterMaterialResponse(
                        material.getId(),
                        material.getName(),
                        material.getType(),
                        material.getDescription(),
                        null,
                        null);
            }
        }

        public static ChapterResponse from(Chapter chapter) {
            return new ChapterResponse(
                    chapter.getId(),
                    chapter.getTitle(),
                    chapter.getMaterials().stream().map(ChapterMaterialResponse::from).toList());
        }
    }

    public static ManagerCourseResponse from(Course course) {
        return new ManagerCourseResponse(
                course.getId(),
                course.getName(),
                course.getCategory(),
                course.getPrice(),
                course.getStatus(),
                course.getDescription(),
                course.getImage(),
                course.getChapters().stream().map(ChapterResponse::from).toList(),
                course.getCreatedAt(),
                course.getUpdatedAt(),
                course.getCancelledAt(),
                course.getArchivedAt());
    }
}
