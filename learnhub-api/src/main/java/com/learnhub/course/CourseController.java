package com.learnhub.course;

import com.learnhub.common.ListCourseResponse;
import com.learnhub.payment.EnrollmentService;
import com.learnhub.user.teacher.TeacherRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok(courseService.getAllCoursesExceptPrivate().stream()
                .map(ListCourseResponse::from).toList());

    }

    @GetMapping("courses/countCourseOrder")
    public ResponseEntity<Integer> getCountOfStudentRegisterInMonth() {
        return ResponseEntity.ok(enrollmentService.getNumberOffStudentRegisterInMonth().size());
    }

    @GetMapping("courses/coursePending")
    public ResponseEntity<Integer> getAllPendingCourse() {
        return ResponseEntity.ok(courseService.getAllCourseByStatus(CourseStatus.PENDING).size());
    }

    @PutMapping("courses/update")
    public void updateCourse(@Valid @RequestBody UpdateCourseRequest req) {
        courseService.updateCourseStatus(courseService.getCourseById(req.id()), req.status());
    }

}

