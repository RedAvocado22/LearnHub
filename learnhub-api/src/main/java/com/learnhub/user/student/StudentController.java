package com.learnhub.user.student;

import jakarta.validation.Valid;
import com.learnhub.user.User;
import com.learnhub.user.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/students")
public class StudentController {
    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateCurrentStudent(
            @AuthenticationPrincipal User user, @Valid @RequestBody UpdateStudentRequest req) {
        studentService.updateStudent((Student)user, req);
        return ResponseEntity.ok(UserResponse.from(user));
    }
}
