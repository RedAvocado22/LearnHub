package com.learnhub.course;

import com.learnhub.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/courses")
public class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
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
        Long id = req.id();
        Course course = courseService.getCourseById(id);
        courseService.updateCourse(course, req);
    }
}
