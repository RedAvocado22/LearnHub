package com.learnhub.user.teacher;

import com.learnhub.course.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/teachers")
public class TeacherController {
    @Autowired
    TeacherService teacherService;

    @Autowired
    CourseService courseService;

    @GetMapping("/{id}")
    public Teacher profile(@PathVariable Long id) {
        return teacherService.getTeacherById(id);
    }

    @GetMapping("/me")
    public Teacher profile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        String email = authentication.getName();
        return teacherService.getTeacherByEmail(email);
    }

    @PutMapping("/me")
    public ResponseEntity<String> edit(@RequestBody EditTeacherRequest teacherRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        String email = authentication.getName();
        Teacher profile = teacherService.getTeacherByEmail(email);

        if (!teacherRequest.major().isEmpty())
            profile.setMajor(teacherRequest.major());

        if (!teacherRequest.website().isEmpty())
            profile.setWebsite(teacherRequest.website());

        if (!teacherRequest.about().isEmpty())
            profile.setAbout(teacherRequest.about());

        teacherService.editProfile(profile);
        return ResponseEntity.ok("Updated successful");
    }
}
