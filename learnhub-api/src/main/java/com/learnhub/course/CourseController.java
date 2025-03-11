package com.learnhub.course;

import com.learnhub.aws.AwsS3Service;
import com.learnhub.user.User;
import com.learnhub.user.teacher.Teacher;
import com.learnhub.user.teacher.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/courses")
public class CourseController {

    private final CourseService courseService;
    private final TeacherRepository teacherRepository;
    private final AwsS3Service awsS3Service;

    @Autowired
    public CourseController(
            CourseService courseService,
            TeacherRepository teacherRepository,
            AwsS3Service awsS3Service) {
        this.courseService = courseService;
        this.teacherRepository = teacherRepository;
        this.awsS3Service = awsS3Service;
    }
    
    @PutMapping("/teacher")
    public void updateCourse(@AuthenticationPrincipal User user, @RequestBody UpdateCourseRequest req) {
        if (user instanceof Teacher teacher) {

            teacher.getCourses().stream().filter(course -> course.getId() == req.id()).findFirst().ifPresent(course -> {
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
            teacherRepository.save(teacher);
            teacherRepository.flush();
        }
    }

    @PostMapping("/teacher")
    public ResponseEntity<String> createCourse(@AuthenticationPrincipal User user,
                                               @RequestParam("name") String name,
                                               @RequestParam("category") Category category,
                                               @RequestParam("price") double price,
                                               @RequestParam("description") String description,
                                               @RequestParam("image") MultipartFile image) {

        if (user instanceof Teacher teacher) {
            String imageUrl = awsS3Service.saveFile(image);

            Course course = new Course(name, category, price, CourseStatus.PRIVATE, description, imageUrl, teacher);
            course.setCreatedAt(LocalDateTime.now());

            teacher.getCourses().add(course);

            teacherRepository.save(teacher);
            teacherRepository.flush();

            return ResponseEntity.ok("Success");
        }

        return ResponseEntity.badRequest().build();
    }
}
