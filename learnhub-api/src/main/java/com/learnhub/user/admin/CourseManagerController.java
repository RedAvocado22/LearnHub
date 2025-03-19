package com.learnhub.user.admin;

import com.learnhub.common.dto.PublicCourseResponse;
import com.learnhub.common.dto.PublicTeacherResponse;
import com.learnhub.course.CourseService;
import com.learnhub.course.CourseStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/courseAdmin")
public class CourseManagerController {
    private final CourseService courseService;

    @Autowired

    public CourseManagerController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/course")
    public ResponseEntity<List<PublicCourseResponse>> getAllCourse() {
        return ResponseEntity.ok(courseService.getAllCoursesExceptPrivate().stream()
                .map(PublicCourseResponse::from).toList());
    }

    @GetMapping("/courseStatus/{id}")
    public ResponseEntity<List<PublicCourseResponse>> getAllCourseByStatus(@PathVariable CourseStatus status) {
        return ResponseEntity.ok(courseService.getAllCourseByStatus(status).stream().map(
                PublicCourseResponse::from).toList());
    }
//    @PostMapping("/courseStatus")
//    public
}
