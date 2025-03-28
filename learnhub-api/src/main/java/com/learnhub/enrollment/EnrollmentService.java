package com.learnhub.enrollment;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import com.learnhub.common.exception.ResourceNotFoundException;
import com.learnhub.course.Course;
import com.learnhub.course.CourseRepository;
import com.learnhub.course.chapter.ChapterMaterial;
import com.learnhub.course.chapter.ChapterMaterialRepository;
import com.learnhub.course.chapter.MaterialType;
import com.learnhub.course.chapter.quiz.Option;
import com.learnhub.course.chapter.quiz.Question;
import com.learnhub.course.chapter.quiz.Quiz;
import com.learnhub.enrollment.dto.EnrollmentStatResponse;
import com.learnhub.enrollment.dto.GradeQuizRequest;
import com.learnhub.notification.NotificationService;
import com.learnhub.user.User;
import com.learnhub.user.UserRepository;
import com.learnhub.user.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final ChapterMaterialRepository chapterMaterialRepository;
    private final FinishedMaterialRepository finishedMaterialRepository;
    private final QuizAttemptRepository quizAttemptRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Autowired
    public EnrollmentService(
            EnrollmentRepository enrollmentRepository,
            ChapterMaterialRepository chapterMaterialRepository,
            FinishedMaterialRepository finishedMaterialRepository,
            QuizAttemptRepository quizAttemptRepository,
            CourseRepository courseRepository,
            UserRepository userRepository,
            NotificationService notificationService) {
        this.enrollmentRepository = enrollmentRepository;
        this.chapterMaterialRepository = chapterMaterialRepository;
        this.finishedMaterialRepository = finishedMaterialRepository;
        this.quizAttemptRepository = quizAttemptRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }


    public List<EnrollmentStatResponse> getEnrollmentsByMonth() {
        return enrollmentRepository.getStats();
    }

    public void createEnrollment(Long userId, Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Can't find course"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Can't find user"));
        if (user.getRole() != UserRole.STUDENT || user.getStudent() == null) {
            throw new ResourceNotFoundException("Can't find student");
        }
        enrollmentRepository.save(Enrollment.builder().
                student(user.getStudent()).
                status(EnrollmentStatus.IN_PROGRESS).
                course(course).
                build()
        );
        notificationService.notifyStudentEnrolled(course);
    }

    @Transactional
    public void updateEnrollStatus(Long studentId, Long courseId) {
        Enrollment enrollment = enrollmentRepository.findById(new EnrollmentKey(courseId, studentId))
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found"));
        long total = enrollment.getCourse().getChapters().stream().flatMap(chapter -> chapter.getMaterials().stream()).count();
        List<FinishedMaterial> finished = finishedMaterialRepository.findByEnrollment(enrollment);
        if (finished.size() == total) {
            enrollment.setStatus(EnrollmentStatus.FINISHED);
            enrollment.setFinishedAt(LocalDateTime.now());
        } else {
            enrollment.setStatus(EnrollmentStatus.IN_PROGRESS);
            enrollment.setFinishedAt(null);
        }
        enrollmentRepository.save(enrollment);
    }

    public void addFinishedMaterial(Long studentId, Long courseId, Long materialId) {
        Enrollment enrollment = enrollmentRepository.findById(new EnrollmentKey(courseId, studentId))
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found"));
        ChapterMaterial material = chapterMaterialRepository.findById(materialId)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found"));
        finishedMaterialRepository.save(FinishedMaterial.builder().enrollment(enrollment).material(material).build());
        updateEnrollStatus(studentId, courseId);
    }

    @Transactional
    public Long gradeQuiz(Long studentId, Long courseId, Long quizId, GradeQuizRequest req) {
        Enrollment enrollment = enrollmentRepository.findById(new EnrollmentKey(courseId, studentId))
                .orElseThrow(() -> new ResourceNotFoundException("Enrollment not found"));
        ChapterMaterial material = chapterMaterialRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Material not found"));
        if (material.getType() != MaterialType.QUIZ || material.getQuiz() == null) {
            throw new ResourceNotFoundException("Quiz not found");
        }
        boolean nonPassed = enrollment.getQuizAttempts().stream().noneMatch(a -> a.getPassed());
        Quiz quiz = material.getQuiz();
        int totalCorrect = 0;
        QuizAttempt attempt = QuizAttempt.builder().enrollment(enrollment).quiz(material).build();
        for (GradeQuizRequest.QuestionRequest reqQuestion : req.questions()) {
            Question question = quiz.getQuestions().stream()
                    .filter(q -> q.getId().equals(reqQuestion.id()))
                    .findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
            List<Option> chosenOptions = reqQuestion.answers().stream()
                    .filter(GradeQuizRequest.QuestionRequest.OptionRequest::chosen)
                    .map(o -> question.getOptions().stream()
                            .filter(opt -> opt.getId().equals(o.id()))
                            .findFirst()
                            .orElseThrow(() -> new ResourceNotFoundException("Option not found")))
                    .collect(Collectors.toList());

            Set<Long> chosenIds = chosenOptions.stream().map(Option::getId).collect(Collectors.toSet());
            Set<Long> correctIds = question.getOptions().stream()
                    .filter(Option::getCorrect).map(Option::getId).collect(Collectors.toSet());
            boolean isCorrect = chosenIds.equals(correctIds);

            if (isCorrect) {
                totalCorrect++;
            }

            attempt.getAnsweredQuestions().add(AnsweredQuestion.builder()
                    .attempt(attempt)
                    .question(question)
                    .correct(isCorrect)
                    .chosenOptions(chosenOptions)
                    .build());
        }
        boolean passed = totalCorrect >= quiz.getPassGrade();
        attempt.setTotalCorrect(totalCorrect);
        attempt.setPassed(passed);
        QuizAttempt saved = quizAttemptRepository.save(attempt);
        if (saved.getPassed() && nonPassed) {
            addFinishedMaterial(studentId, courseId, material.getId());
        }
        return saved.getId();
    }
}
