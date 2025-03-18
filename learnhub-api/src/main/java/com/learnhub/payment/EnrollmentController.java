package com.learnhub.payment;

import com.learnhub.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

public class EnrollmentController {
    @Autowired
    EnrollmentService enrollmentService;

    @PostMapping("/student/me/{courseId}")
    public ResponseEntity<String> createEnrollment(@AuthenticationPrincipal User user,
                                                   @RequestParam("id") Long id) {
        enrollmentService.createEnrollment(user, id);
        return ResponseEntity.ok("Success");
    }
}
