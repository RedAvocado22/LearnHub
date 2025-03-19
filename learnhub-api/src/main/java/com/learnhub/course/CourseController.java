package com.learnhub.course;

import java.math.BigDecimal;

import com.learnhub.user.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/api/v1/courses")
public class CourseController {
    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @PutMapping("/teacher")
    public ResponseEntity<String> updateCourse(@AuthenticationPrincipal User user, @RequestBody UpdateCourseRequest req) {
        courseService.updateCourseOfTeacher(user, req);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/teacher")
    public ResponseEntity<String> createCourse(@AuthenticationPrincipal User user,
                                               @RequestParam("name") String name,
                                               @RequestParam("category") Category category,
                                               @RequestParam("price") BigDecimal price,
                                               @RequestParam("description") String description,
                                               @RequestParam("image") MultipartFile image) {
        courseService.addCourseForTeacher(user, name, category, price, description, image);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("coursePending")
    public ResponseEntity<Integer> getAllPendingCourse() {
        return ResponseEntity.ok(courseService.getAllCourseByStatus(CourseStatus.PENDING).size());
    }

    @PutMapping("update")
    public void updateCourse(@Valid @RequestBody UpdateCourseRequest req) {
        courseService.updateCourseStatus(courseService.findCourseById(req.id()), req.status());
    }
}
