package com.learnhub.course;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.learnhub.aws.AwsS3Service;
import com.learnhub.user.User;
import com.learnhub.user.UserRepository;
import com.learnhub.user.UserRole;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CourseService {
    private CourseRepository courseRepository;
    private UserRepository userRepository;
    private AwsS3Service awsS3Service;

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    public CourseService(CourseRepository courseRepository,
                         UserRepository userRepository,
                         AwsS3Service awsS3Service,
                         EntityManager entityManager) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.awsS3Service = awsS3Service;
        this.entityManager = entityManager;
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

    public List<Course> getAllCoursesExceptPrivate() {

        return courseRepository.findAll().stream().filter(
                        course -> course.getStatus() != CourseStatus.PRIVATE)
                .toList();
    }

    public List<Course> getAllCourseByStatus(CourseStatus courseStatus) {
        return courseRepository.findAll().stream().filter(course -> course.getStatus() == courseStatus).toList();
    }


    public Course findCourseById(Long id) {
        return courseRepository.findcoursebyid(id);
    }

    public void updateCourseStatus(Course course, CourseStatus status) {
        course.setStatus(status);
        courseRepository.save(course);
    }
}
