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
import com.learnhub.course.review.Review;
import com.learnhub.enrollment.AnsweredQuestion;
import com.learnhub.enrollment.Enrollment;
import com.learnhub.enrollment.EnrollmentStatus;
import com.learnhub.enrollment.FinishedMaterial;
import com.learnhub.enrollment.QuizAttempt;
import com.learnhub.user.User;
import com.learnhub.user.UserRole;
import com.learnhub.user.UserStatus;
import com.learnhub.user.manager.ManagerProfile;
import com.learnhub.user.student.StudentProfile;
import com.learnhub.user.student.StudentType;
import com.learnhub.user.teacher.TeacherProfile;

public record CurrentUserResponse(
        Long id,
        String email,
        String firstName,
        String lastName,
        String avatar,
        UserRole role,
        UserStatus status,
        CurrentStudentResponse student,
        CurrentTeacherResponse teacher,
        CurrentManagerResponse manager,
        LocalDateTime createdAt
) {
    static record CurrentStudentResponse(StudentType type, String school, List<EnrollmentResponse> enrollments) {
        static record EnrollmentResponse(
                StudentCourseResponse course,
                EnrollmentStatus status,
                List<FinishedMaterialResponse> finishedMaterials,
                List<QuizAttemptResponse> quizAttempts,
                LocalDateTime enrolledAt,
                LocalDateTime finishedAt) {
            static record StudentCourseResponse(
                    Long id,
                    String name,
                    Category category,
                    BigDecimal price,
                    CourseStatus status,
                    String description,
                    String image,
                    List<CourseResponse.ChapterResponse> chapters,
                    List<ReviewResponse> reviews,
                    TeacherResponse teacher,
                    LocalDateTime createdAt
            ) {
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
                static record TeacherResponse(Long id, String fullName, String avatar, String major) {
                    public static TeacherResponse from(TeacherProfile teacher) {
                        return new TeacherResponse(
                                teacher.getId(),
                                teacher.getUser().getFirstName() + " " + teacher.getUser().getLastName(),
                                teacher.getUser().getAvatar(),
                                teacher.getMajor());
                    }
                }

                public static StudentCourseResponse from(Course course) {
                    return new StudentCourseResponse(
                            course.getId(),
                            course.getName(),
                            course.getCategory(),
                            course.getPrice(),
                            course.getStatus(),
                            course.getDescription(),
                            course.getImage(),
                            course.getChapters().stream().map(CourseResponse.ChapterResponse::from).toList(),
                            course.getReviews().stream().map(ReviewResponse::from).toList(),
                            TeacherResponse.from(course.getTeacher()),
                            course.getCreatedAt());
                }
            }

            static record FinishedMaterialResponse(Long materialId, LocalDateTime finishedAt) {
                public static FinishedMaterialResponse from(FinishedMaterial material) {
                    return new FinishedMaterialResponse(material.getMaterial().getId(), material.getFinishedAt());
                }
            }

            static record QuizAttemptResponse(
                    Long id,
                    Long quizId,
                    Integer totalCorrect,
                    Boolean passed,
                    List<AnsweredQuestionResponse> answers,
                    LocalDateTime submittedAt) {
                static record AnsweredQuestionResponse(Long questionId, Boolean correct, List<Long> optionIds) {
                    public static AnsweredQuestionResponse from(AnsweredQuestion answer) {
                        return new AnsweredQuestionResponse(
                                answer.getQuestion().getId(),
                                answer.getCorrect(),
                                answer.getChosenOptions().stream().map(option -> option.getId()).toList());
                    }
                }

                public static QuizAttemptResponse from(QuizAttempt attempt) {
                    return new QuizAttemptResponse(
                            attempt.getId(),
                            attempt.getQuiz().getId(),
                            attempt.getTotalCorrect(),
                            attempt.getPassed(),
                            attempt.getAnsweredQuestions().stream().map(AnsweredQuestionResponse::from).toList(),
                            attempt.getSubmittedAt());
                }
            }

            public static EnrollmentResponse from(Enrollment enrollment) {
                return new EnrollmentResponse(
                        StudentCourseResponse.from(enrollment.getCourse()),
                        enrollment.getStatus(),
                        enrollment.getFinishedMaterials().stream().map(FinishedMaterialResponse::from).toList(),
                        enrollment.getQuizAttempts().stream().map(QuizAttemptResponse::from).toList(),
                        enrollment.getEnrolledAt(),
                        enrollment.getFinishedAt());
            }
        }

        public static CurrentStudentResponse from(StudentProfile student) {
            return new CurrentStudentResponse(
                    student.getType(),
                    student.getSchool(),
                    student.getEnrollments().stream().map(EnrollmentResponse::from).toList());
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

    static record CurrentManagerResponse(String department, List<CourseResponse> courses) {
        public static CurrentManagerResponse from(ManagerProfile manager) {
            return new CurrentManagerResponse(
                    manager.getDepartment(),
                    manager.getCourses().stream().map(CourseResponse::from).toList()
            );
        }
    }

    public static CurrentUserResponse from(User user) {
        if (user.getRole() == UserRole.STUDENT && user.getStudent() != null) {
            return new CurrentUserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getAvatar(),
                    user.getRole(),
                    user.getStatus(),
                    CurrentStudentResponse.from(user.getStudent()),
                    null,
                    null,
                    user.getCreatedAt());
        } else if (user.getRole() == UserRole.TEACHER && user.getTeacher() != null) {
            return new CurrentUserResponse(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getAvatar(),
                    user.getRole(),
                    user.getStatus(),
                    null,
                    CurrentTeacherResponse.from(user.getTeacher()),
                    null,
                    user.getCreatedAt());
        } else if (user.getRole() == UserRole.COURSE_MANAGER && user.getManager() != null) {
            return new CurrentUserResponse(user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getAvatar(),
                    user.getRole(),
                    user.getStatus(),
                    null,
                    null,
                    CurrentManagerResponse.from(user.getManager()),
                    user.getCreatedAt());
        }
        return new CurrentUserResponse(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                user.getAvatar(),
                user.getRole(),
                user.getStatus(),
                null,
                null,
                null,
                user.getCreatedAt());
    }
}

record CourseResponse(
        Long id,
        String name,
        Category category,
        BigDecimal price,
        CourseStatus status,
        String description,
        String image,
        List<ChapterResponse> chapters,
        List<ReviewResponse> reviews,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        LocalDateTime cancelledAt,
        LocalDateTime archivedAt
) {
    static record ReviewResponse(Long id, String reviewer, int star, String comment, Long user, Long course, LocalDateTime submittedAt) {
        public static ReviewResponse from(Review review) {
            return new ReviewResponse(
                    review.getId(),
                    review.getUser().getEmail(),
                    review.getStar(),
                    review.getComment(),
                    review.getUser().getId(),
                    review.getCourse().getId(),
                    review.getCreatedAt()
            );
        }
    }
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
                static record QuestionResponse(Long id, String text, String explanation, List<OptionResponse> options) {
                    static record OptionResponse(Long id, String text, Boolean correct) {
                        public static OptionResponse from(Option option) {
                            return new OptionResponse(option.getId(), option.getText(), option.getCorrect());
                        }
                    }

                    public static QuestionResponse from(Question question) {
                        return new QuestionResponse(
                                question.getId(),
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
                course.getReviews().stream().map(ReviewResponse::from).toList(),
                course.getCreatedAt(),
                course.getUpdatedAt(),
                course.getCancelledAt(),
                course.getArchivedAt());
    }
}
