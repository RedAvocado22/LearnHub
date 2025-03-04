package com.learnhub.user.teacher;

import jakarta.validation.Valid;
import com.learnhub.user.User;
import com.learnhub.user.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/teachers")
public class TeacherController {
    private final TeacherService teacherService;

    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherDetailsResponse> getById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(TeacherDetailsResponse.from(teacherService.getTeacherById(id)));
    }

    @PostMapping
    public ResponseEntity<Long> addStudent(@Valid @RequestBody AddTeacherRequest req) {
        return ResponseEntity.ok(teacherService.addTeacherWithDefaultPassword(req));
    }

    @PutMapping("/me")
    public ResponseEntity<UserResponse> updateCurrentTeacher(
            @AuthenticationPrincipal User user,
            @Valid @RequestBody UpdateTeacherRequest req) {
        teacherService.updateTeacher((Teacher)user, req);
        return ResponseEntity.ok(UserResponse.from(user));
    }
}
