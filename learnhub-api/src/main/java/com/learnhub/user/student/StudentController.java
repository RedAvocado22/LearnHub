package com.learnhub.user.student;

import com.learnhub.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/students")
public class StudentController {

    PasswordEncoder passwordEncoder;

    UserService userService;

    StudentService studentService;

    @Autowired
    public StudentController(PasswordEncoder passwordEncoder, UserService userService, StudentService studentService) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.studentService = studentService;
    }

    @GetMapping("/me")
    public Student profile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        String email = authentication.getName();
        return studentService.getStudentByEmail(email);
    }

    @PutMapping("/me")
    public ResponseEntity<String> edit(@RequestBody EditStudentRequest studentRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        String email = authentication.getName();
        Student profile = studentService.getStudentByEmail(email);

        if (!studentRequest.school().isEmpty())
            profile.setSchool(studentRequest.school());

        studentService.editProfile(profile);
        return ResponseEntity.ok("Updated successful");
    }
}
