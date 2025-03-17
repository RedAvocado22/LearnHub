package com.learnhub.course;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.learnhub.course.category.Category;
import com.learnhub.course.chapter.*;
import com.learnhub.course.chapter.lesson.LessonMaterial;
import com.learnhub.course.chapter.lesson.Lesson;
import com.learnhub.course.chapter.lesson.LessonMaterialRepository;
import com.learnhub.course.chapter.lesson.LessonRepository;
import com.learnhub.course.chapter.quiz.Option;
import com.learnhub.course.chapter.quiz.Question;
import com.learnhub.course.chapter.quiz.Quiz;
import com.learnhub.course.dto.UpdateCourseRequest;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import com.learnhub.aws.AwsS3Service;
import com.learnhub.common.exception.ResourceNotFoundException;
import com.learnhub.course.chapter.lesson.dto.AddChapterMaterialRequest;
import com.learnhub.user.User;
import com.learnhub.user.UserRepository;
import com.learnhub.user.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CourseService {
    private final CourseRepository courseRepository;
    private final ChapterRepository chapterRepository;
    private final ChapterMaterialRepository chapterMaterialRepository;
    private final UserRepository userRepository;
    private final AwsS3Service awsS3Service;

    @PersistenceContext
    private final EntityManager entityManager;
    private final LessonRepository lessonRepository;
    private final LessonMaterialRepository lessonMaterialRepository;

    @Autowired
    public CourseService(
            CourseRepository courseRepository,
            ChapterRepository chapterRepository,
            ChapterMaterialRepository chapterMaterialRepository,
            UserRepository userRepository,
            AwsS3Service awsS3Service,
            EntityManager entityManager, LessonRepository lessonRepository, LessonMaterialRepository lessonMaterialRepository) {
        this.courseRepository = courseRepository;
        this.chapterRepository = chapterRepository;
        this.chapterMaterialRepository = chapterMaterialRepository;
        this.userRepository = userRepository;
        this.awsS3Service = awsS3Service;
        this.entityManager = entityManager;
        this.lessonRepository = lessonRepository;
        this.lessonMaterialRepository = lessonMaterialRepository;
    }

    public List<Course> getAllPublicCourses() {
        return courseRepository.findAll().stream().filter(course -> course.getStatus() == CourseStatus.PUBLIC).toList();
    }

    @Transactional
    public void updateCourseOfTeacher(User user, UpdateCourseRequest req) {
        User u = entityManager.merge(user);
        if (u.getRole() == UserRole.TEACHER && u.getTeacher() != null) {
            u.getTeacher().getCourses().stream().filter(course -> course.getId() == req.id()).findFirst().ifPresent(course -> {
                course.setName(req.name());
                course.setCategory(req.category());
                course.setPrice(req.price());

                switch (req.status()) {
                    case PUBLIC:
                        course.setStatus(CourseStatus.PUBLIC);
                        course.setUpdatedAt(LocalDateTime.now());
                        break;
                    case PRIVATE:
                        course.setStatus(CourseStatus.PRIVATE);
                        course.setUpdatedAt(LocalDateTime.now());
                        break;
                    case ARCHIVED:
                        course.setStatus(CourseStatus.ARCHIVED);
                        course.setArchivedAt(LocalDateTime.now());
                        break;
                    case PENDING:
                        course.setStatus(CourseStatus.PENDING);
                        course.setUpdatedAt(LocalDateTime.now());
                        break;
                    case CANCELLED:
                        course.setStatus(CourseStatus.CANCELLED);
                        course.setCancelledAt(LocalDateTime.now());
                        break;
                }
            });
            userRepository.saveAndFlush(u);
        } else {
            throw new IllegalStateException();
        }
    }

    @Transactional
    public void addCourseForTeacher(
            User user,
            String name,
            Category category,
            BigDecimal price,
            String description,
            MultipartFile image) {
        if (user.getRole() != UserRole.TEACHER || user.getTeacher() == null) {
            throw new IllegalStateException();
        }

        String imageUrl = awsS3Service.saveFile(image);

        Course course = Course.builder()
                .name(name)
                .category(category)
                .price(price)
                .status(CourseStatus.PRIVATE)
                .description(description)
                .image(imageUrl)
                .teacher(user.getTeacher())
                .build();

        courseRepository.saveAndFlush(course);
    }

    public Long addMaterialToChapter(Long chapterId, AddChapterMaterialRequest req) {
        Chapter chapter = chapterRepository.findById(chapterId)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter not found"));

        ChapterMaterial material = ChapterMaterial.builder()
                .chapter(chapter)
                .name(req.name())
                .type(req.type())
                .description(req.description())
                .build();

        if (material.getType() == MaterialType.QUIZ && req.quiz() != null) {
            Quiz quiz = Quiz.builder()
                    .chapterMaterial(material)
                    .passGrade(req.quiz().passGrade())
                    .build();

            List<Question> questions = new ArrayList<>();

            req.quiz().questions().forEach(q -> {
                Question question = Question.builder()
                        .quiz(quiz)
                        .text(q.text())
                        .explanation(q.explanation())
                        .build();
                List<Option> options = new ArrayList<>();
                q.options().forEach(o -> {
                    options.add(Option.builder()
                            .question(question)
                            .text(o.text())
                            .correct(o.correct())
                            .build());
                });
                question.setOptions(options);
                questions.add(question);
            });

            quiz.setQuestions(questions);
            material.setQuiz(quiz);
        }

        ChapterMaterial saved = chapterMaterialRepository.save(material);

        return saved.getId();
    }

    @Transactional
    public void addLessonFiles(Long lessonId, MultipartFile video, List<String> materialNames, List<MultipartFile> materialFiles) {
        ChapterMaterial material = chapterMaterialRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));

        if (material.getType() != MaterialType.LESSON) {
            throw new ResourceNotFoundException("Lesson not found");
        }

        String videoUrl = "";
        if (!video.isEmpty()) {
            videoUrl = awsS3Service.saveFile(video);
        }

        Lesson lesson = Lesson.builder()
                .chapterMaterial(material)
                .videoUrl(videoUrl)
                .build();

        if (materialNames != null && !materialNames.isEmpty() && materialFiles != null && !materialFiles.isEmpty()) {
            List<LessonMaterial> materials = new ArrayList<>();
            for (int i = 0; i < materialNames.size(); i++) {
                String materialUrl = awsS3Service.saveFile(materialFiles.get(i));
                materials.add(LessonMaterial.builder()
                        .lesson(lesson)
                        .name(materialNames.get(i))
                        .fileUrl(materialUrl)
                        .build());
            }
            lesson.setMaterials(materials);
        }

        material.setLesson(lesson);
        chapterMaterialRepository.save(material);
    }

    public void deleteMaterial(Long id) {
        ChapterMaterial material = chapterMaterialRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Material not found")
        );

        switch (material.getType()) {
            case QUIZ:
                break;
            case LESSON:
                Lesson lesson = material.getLesson();
                if (lesson.getVideoUrl() != null && !lesson.getVideoUrl().isEmpty()) {
                    awsS3Service.deleteFile(lesson.getVideoUrl());
                }

                if (lesson.getMaterials() != null && !lesson.getMaterials().isEmpty()) {
                    for (LessonMaterial lessonMaterial : lesson.getMaterials()) {
                        awsS3Service.deleteFile(lessonMaterial.getFileUrl());
                    }
                }
        }

        chapterMaterialRepository.delete(material);
    }

    public void deleteLessonMaterial(Long id) {
        lessonMaterialRepository.deleteById(id);
    }
}
