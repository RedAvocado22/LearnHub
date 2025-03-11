package com.learnhub.course;

import com.learnhub.common.ListCourseResponse;
import com.learnhub.payment.EnrollmentService;
import com.learnhub.user.User;
import com.learnhub.user.teacher.Teacher;
import com.learnhub.user.teacher.TeacherRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/courses")
public class CourseController {
    @Autowired
    private CourseService courseService;

    @Autowired
    private EnrollmentService enrollmentService;

    @Autowired
    private TeacherRepository teacherRepository;

    @GetMapping("/courseListManager")
    public ResponseEntity<List<ListCourseResponse>> getAllCourse() {
        return ResponseEntity.ok(courseService.getAllCourses().stream()
                .map(ListCourseResponse::from).toList());

    }

    @GetMapping("courses/countCourseOrder")
    public ResponseEntity<Integer> getCountOfStudentRegisterInMonth() {
        return ResponseEntity.ok(enrollmentService.getNumbeerOffStudentRegisterInMonth().size());
    }

    @GetMapping("courses/coursePending")
    public ResponseEntity<Integer> getAllPendingCourse() {
        return ResponseEntity.ok(courseService.getAllCourseByStatus(CourseStatus.PENDING).size());
    }

    @PutMapping("courses/update")
    public void updateCourse(@Valid @RequestBody UpdateCourseRequest req) {
        courseService.updateCourseStatus(courseService.findCourseById(req.id()), req.status());
    }

}

