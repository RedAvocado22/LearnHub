package com.learnhub.user.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
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
import com.learnhub.user.User;
import com.learnhub.user.UserRole;
import com.learnhub.user.UserStatus;
import com.learnhub.user.student.StudentProfile;
import com.learnhub.user.student.StudentType;
import com.learnhub.user.teacher.TeacherProfile;

public record CurrentUserResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        UserRole role,
        UserStatus status,
        CurrentStudentResponse student,
        CurrentTeacherResponse teacher,
        LocalDateTime createdAt
) {
    static record CurrentStudentResponse(StudentType type, String school) {
        public static CurrentStudentResponse from(StudentProfile student) {
            return new CurrentStudentResponse(student.getType(), student.getSchool());
        }
    }

    static record CurrentTeacherResponse(
            String major,
            String phone,
            String workAddress,
            String city,
            String website,
            String biography,
            List<CourseResponse> courses
    ) {
        static record CourseResponse(
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
                        static record MaterialResponse(String name, String fileUrl) {
                            public static MaterialResponse from(LessonMaterial material) {
                                return new MaterialResponse(material.getName(), material.getFileUrl());
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
                        return new ChapterMaterialResponse(
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

            public static CourseResponse from(Course course) {
                return new CourseResponse(
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

        public static CurrentTeacherResponse from(TeacherProfile teacher) {
            return new CurrentTeacherResponse(
                    teacher.getMajor(),
                    teacher.getPhone(),
                    teacher.getWorkAddress(),
                    teacher.getCity(),
                    teacher.getWebsite(),
                    teacher.getBiography(),
                    teacher.getCourses().stream().map(CourseResponse::from).toList());
        }
    }

    public static CurrentUserResponse from(User user) {
        if (user.getRole() == UserRole.STUDENT && user.getStudent() != null) {
            return new CurrentUserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    user.getStatus(),
                    CurrentStudentResponse.from(user.getStudent()),
                    null,
                    user.getCreatedAt());
        } else if (user.getRole() == UserRole.TEACHER && user.getTeacher() != null) {
            return new CurrentUserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    user.getStatus(),
                    null,
                    CurrentTeacherResponse.from(user.getTeacher()),
                    user.getCreatedAt());
        }
        return new CurrentUserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getStatus(),
                null,
                null,
                user.getCreatedAt());
    }
}
