package com.learnhub.user;

import com.learnhub.user.student.ChangeStudentRequest;
import com.learnhub.user.student.Student;
import com.learnhub.user.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1")
public class UserProfileController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UserService userService;

    @Autowired
    StudentService studentService;

    @GetMapping("/studentProfile")
    public Student studentProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        String email = authentication.getName();
        Student student = studentService.getStudentByEmail(email);

        return student;
    }

    @PostMapping("/changeStudent")
    public ResponseEntity<String> changeStudent(@RequestBody ChangeStudentRequest studentRequest) {
        Student st = studentService.getStudentByEmail(studentRequest.email());
        st.setFirstName(studentRequest.firstName());
        st.setLastName(studentRequest.lastName());
        studentService.changeProfile(st);
        return ResponseEntity.ok("Student profile updated");
    }


    public User teacherProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);

        return user;
    }

    @PostMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest passwordRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }
        String email = authentication.getName();
        User user = userService.getUserByEmail(email);
        String password1 = passwordRequest.oldpassword();
        String password = passwordEncoder.encode(passwordRequest.oldpassword());
        if(!passwordEncoder.matches(password1,user.getPassword())) {
            return ResponseEntity.badRequest().body("Current password does not match");
        } else if (!passwordRequest.newpassword().equals(passwordRequest.repassword())) {
            return ResponseEntity.badRequest().body("Confirm Password does not match");
        }
        else {
            user.setPassword(passwordEncoder.encode(passwordRequest.newpassword()));
            userService.saveUser(user);
            return ResponseEntity.ok("Password changed successfully");
        }

    }

}
