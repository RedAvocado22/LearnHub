package com.learnhub.enrollment;

import com.learnhub.course.Course;
import com.learnhub.enrollment.dto.GradeQuizRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/enrollments")
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @Autowired
    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/students/{sid}/courses/{cid}/materials/{mid}")
    public ResponseEntity<String> completeMaterial(
            @PathVariable("sid") Long studentId,
            @PathVariable("cid") Long courseId,
            @PathVariable("mid") Long materialId) {
        enrollmentService.addFinishedMaterial(studentId, courseId, materialId);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/getAllEnrollment")
    public ResponseEntity<List<Course>> getAllEnrollment() {
        return ResponseEntity.ok(enrollmentService.getAllEnrollment());

    }

    @PostMapping("/students/{sid}/courses/{cid}/quizzes/{qid}/grade")
    public ResponseEntity<Long> gradeQuiz(
            @PathVariable("sid") Long studentId,
            @PathVariable("cid") Long courseId,
            @PathVariable("qid") Long quizId,
            @RequestBody GradeQuizRequest req) {
        return ResponseEntity.ok(enrollmentService.gradeQuiz(studentId, courseId, quizId, req));
    }
}
