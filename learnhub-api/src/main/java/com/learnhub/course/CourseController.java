package com.learnhub.course;

import com.learnhub.user.User;
import com.learnhub.user.teacher.Teacher;
import com.learnhub.user.teacher.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/courses")
public class CourseController {

    private final CourseService courseService;
    private final TeacherRepository teacherRepository;

    @Autowired
    public CourseController(CourseService courseService, TeacherRepository teacherRepository) {
        this.courseService = courseService;
        this.teacherRepository = teacherRepository;
    }

    @GetMapping("/teacher")
    public ResponseEntity<List<TeacherCourseListResponse>> getCourseByType(
            @AuthenticationPrincipal User user) {
        Long id = user.getId();
        return ResponseEntity.ok(
                courseService.getCoursesByTeacher(id)
                        .stream()
                        .filter(course -> !course.getStatus().equals(CourseStatus.ARCHIVED))
                        .map(TeacherCourseListResponse::from).toList()
        );
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
}
