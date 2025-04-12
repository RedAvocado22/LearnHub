package com.learnhub.course;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import com.learnhub.aws.AwsS3Service;
import com.learnhub.common.exception.ResourceNotFoundException;
import com.learnhub.course.category.Category;
import com.learnhub.course.category.CategoryRepository;
import com.learnhub.course.chapter.Chapter;
import com.learnhub.course.chapter.ChapterMaterial;
import com.learnhub.course.chapter.ChapterMaterialRepository;
import com.learnhub.course.chapter.ChapterRepository;
import com.learnhub.course.chapter.MaterialType;
import com.learnhub.course.chapter.lesson.Lesson;
import com.learnhub.course.chapter.lesson.LessonMaterial;
import com.learnhub.course.chapter.lesson.dto.AddChapterMaterialRequest;
import com.learnhub.course.chapter.lesson.dto.UpdateChapterMaterialRequest;
import com.learnhub.course.chapter.quiz.Option;
import com.learnhub.course.chapter.quiz.Question;
import com.learnhub.course.chapter.quiz.Quiz;
import com.learnhub.course.dto.UpdateCourseRequest;
import com.learnhub.notification.NotificationService;
import com.learnhub.user.User;
import com.learnhub.user.UserRepository;
import com.learnhub.user.UserRole;
import com.learnhub.util.mail.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CourseService {
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final CourseRepository courseRepository;
    private final ChapterRepository chapterRepository;
    private final ChapterMaterialRepository chapterMaterialRepository;
    private final AwsS3Service awsS3Service;
    private final NotificationService notificationService;
    private final EmailService emailService;

    @PersistenceContext
    private final EntityManager entityManager;

    @Autowired
    public CourseService(
            CategoryRepository categoryRepository,
            CourseRepository courseRepository,
            ChapterRepository chapterRepository,
            ChapterMaterialRepository chapterMaterialRepository,
            AwsS3Service awsS3Service,
            EntityManager entityManager, UserRepository userRepository,
            NotificationService notificationService,
            EmailService emailService) {
        this.categoryRepository = categoryRepository;
        this.courseRepository = courseRepository;
        this.chapterRepository = chapterRepository;
        this.chapterMaterialRepository = chapterMaterialRepository;
        this.awsS3Service = awsS3Service;
        this.entityManager = entityManager;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
        this.emailService = emailService;
    }

    public List<Course> getAllPublicCourses() {
        return courseRepository.findAll().stream().filter(course -> course.getStatus() == CourseStatus.PUBLIC).toList();
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Transactional
    public Long changeCourseStatus(Long courseId, CourseStatus newStatus, String reason) {
        Course course = courseRepository.findById(courseId).orElseThrow(
                () -> new ResourceNotFoundException("Course not found"));
        course.setStatus(newStatus);
        Course saved = courseRepository.save(course);
        switch (newStatus) {
            case PRIVATE:
                emailService.sendRejectCourseEmail(saved.getTeacher().getUser().getEmail(), saved.getName(), reason);
                notificationService.notifyCourseRejected(saved);
                break;
            case PUBLIC:
                emailService.sendApproveCourseEmail(saved.getTeacher().getUser().getEmail(), saved.getName(), reason);
                notificationService.notifyCoursePublished(saved);
                break;
            default:
                break;
        }
        return saved.getId();
    }

    @Transactional
    public void updateCourseOfTeacher(User user, Long courseId, UpdateCourseRequest metadata, MultipartFile image) {
        User u = entityManager.merge(user);
        if (u.getRole() != UserRole.TEACHER || u.getTeacher() == null) {
            throw new IllegalStateException("Not a teacher");
        }
        Course course = u.getTeacher().getCourses().stream().filter(c -> c.getId() == courseId).findFirst().orElseThrow(
                () -> new IllegalStateException("Can't find course"));
        if (metadata.name() != null && !metadata.name().isEmpty() && !metadata.name().isBlank()) {
            course.setName(metadata.name());
        }
        if (metadata.categoryId() != null) {
            Category category = categoryRepository.findById(metadata.categoryId()).orElseThrow(
                    () -> new ResourceNotFoundException("Can't find category"));
            course.setCategory(category);
        }
        if (metadata.price() != null) {
            course.setPrice(metadata.price());
        }
        boolean notify = false;
        if (metadata.status() != null) {
            switch (metadata.status()) {
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
                    notify = true;
                    break;
                case CANCELLED:
                    course.setStatus(CourseStatus.CANCELLED);
                    course.setCancelledAt(LocalDateTime.now());
                    break;
            }
        }
        if (metadata.description() != null) {
            course.setDescription(metadata.description());
        }

        if (image != null) {
            if (course.getImage() != null) {
                awsS3Service.deleteFile(course.getImage());
            }
            String imageUrl = awsS3Service.saveFile(image);
            course.setImage(imageUrl);
        }

        Course saved = courseRepository.save(course);
        if (notify) {
            notificationService.notifyCourseSubmitted(saved);
        }
    }

    @Transactional
    public void addCourseForTeacher(
            User user,
            String name,
            Long categoryId,
            BigDecimal price,
            String description,
            MultipartFile image) {
        if (user.getRole() != UserRole.TEACHER || user.getTeacher() == null) {
            throw new IllegalStateException("Not a teacher");
        }
        Category category = categoryRepository.findById(categoryId).orElseThrow(
                () -> new ResourceNotFoundException("Can't find category"));

        String imageUrl = awsS3Service.saveFile(image);

        courseRepository.saveAndFlush(Course.builder()
                .name(name)
                .category(category)
                .price(price)
                .status(CourseStatus.PRIVATE)
                .description(description)
                .image(imageUrl)
                .teacher(user.getTeacher())
                .build());
    }

    @Transactional
    public void updateChapterMaterial(Long id, UpdateChapterMaterialRequest req) {
        ChapterMaterial material = chapterMaterialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found"));
        if (req.name() != null && !req.name().isEmpty() && !req.name().isBlank()) {
            material.setName(req.name());
        }
        if (req.description() != null) {
            material.setDescription(req.description());
        }
        if (material.getType() == MaterialType.QUIZ && material.getQuiz() != null && req.quiz() != null) {
            material.getQuiz().setPassGrade(req.quiz().passGrade());

            material.getQuiz().getQuestions().clear();
            req.quiz().questions().forEach(q -> {
                Question question = Question.builder()
                        .quiz(material.getQuiz())
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
                material.getQuiz().getQuestions().add(question);
            });
        }
        chapterMaterialRepository.save(material);
    }

    @Transactional
    public void deleteChapter(Long id) {
        Chapter chapter = chapterRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Chapter not found"));
        if (chapter.getMaterials() != null) {
            chapter.getMaterials().forEach(m -> deleteChapterMaterial(m.getId()));
        }
        chapterRepository.delete(chapter);
    }

    @Transactional
    public void deleteChapterMaterial(Long id) {
        ChapterMaterial material = chapterMaterialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found"));
        if (material.getType() == MaterialType.LESSON && material.getLesson() != null) {
            Lesson lesson = material.getLesson();
            if (lesson.getVideoUrl() != null) {
                awsS3Service.deleteFile(lesson.getVideoUrl());
            }
            if (lesson.getMaterials() != null) {
                lesson.getMaterials().forEach(m -> {
                    if (m.getFileUrl() != null) {
                        awsS3Service.deleteFile(m.getFileUrl());
                    }
                });
            }
        }
        chapterMaterialRepository.delete(material);
    }

    @Transactional
    public void updateLessonFiles(
            Long lessonId, MultipartFile video, List<String> materialNames, List<MultipartFile> materialFiles) {
        ChapterMaterial material = chapterMaterialRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));
        if (material.getType() != MaterialType.LESSON || material.getLesson() == null) {
            throw new ResourceNotFoundException("Lesson not found");
        }
        if (video != null) {
            if (material.getLesson().getVideoUrl() != null) {
                awsS3Service.deleteFile(material.getLesson().getVideoUrl());
            }
            String videoUrl = awsS3Service.saveFile(video);
            material.getLesson().setVideoUrl(videoUrl);
        }
        if (materialNames != null && !materialNames.isEmpty() && materialFiles != null && !materialFiles.isEmpty()) {
            List<LessonMaterial> materials = new ArrayList<>();
            for (int i = 0; i < materialNames.size(); i++) {
                String materialUrl = awsS3Service.saveFile(materialFiles.get(i));
                materials.add(LessonMaterial.builder()
                        .lesson(material.getLesson())
                        .name(materialNames.get(i))
                        .fileUrl(materialUrl)
                        .build());
            }
            if (material.getLesson().getMaterials() == null) {
                material.getLesson().setMaterials(new ArrayList<>());
            }
            material.getLesson().getMaterials().addAll(materials);
        }
        chapterMaterialRepository.save(material);
    }

    public void assignManager(Long courseId, Long managerId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + courseId));

        User manager = userRepository.findById(managerId)
                .orElseThrow(() -> new ResourceNotFoundException("Manager not found with id: " + managerId));

        course.setAssignAt(LocalDateTime.now());
        course.setManager(manager.getManager());
        Course saved = courseRepository.save(course);
        notificationService.notifyCourseAssigned(saved);
    }

    @Transactional
    public boolean deleteLessonFiles(Long lessonId, String fileUrl) {
        ChapterMaterial material = chapterMaterialRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found"));
        if (material.getType() != MaterialType.LESSON || material.getLesson() == null) {
            throw new ResourceNotFoundException("Lesson not found");
        }
        return material.getLesson().getMaterials().removeIf(m -> m.getFileUrl().equals(fileUrl)) &&
                awsS3Service.deleteFile(fileUrl);
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

    public List<Course> getNewestCourses() {
        return courseRepository.findNewestCourses(8);
    }
}
