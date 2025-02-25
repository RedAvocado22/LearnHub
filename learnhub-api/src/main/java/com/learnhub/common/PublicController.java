package com.learnhub.common;

import java.util.List;

import com.learnhub.user.teacher.Teacher;
import jakarta.validation.Valid;
import com.learnhub.contact.ContactRequest;
import com.learnhub.contact.ContactService;
import com.learnhub.course.CourseService;
import com.learnhub.user.teacher.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/public")
public class PublicController {
    private final CourseService courseService;
    private final TeacherService teacherService;
    private final ContactService contactService;

    @Autowired
    public PublicController(
            CourseService courseService,
            TeacherService teacherService,
            ContactService contactService) {
        this.courseService = courseService;
        this.teacherService = teacherService;
        this.contactService = contactService;
    }

    @GetMapping("/courses")
    public ResponseEntity<List<CourseListResponse>> getAllPublishedCourses() {
        return ResponseEntity.ok(courseService.getAllPublicCourses().stream()
                .map(CourseListResponse::from).toList());
    }

    @GetMapping("/teachers/{id}")
    public ResponseEntity<TeacherDetailsResponse> getTeacher(@PathVariable("id") Long id) {
        return ResponseEntity.ok(TeacherDetailsResponse.from(teacherService.getTeacherById(id)));
    }

    @PostMapping("/contacts")
    public ResponseEntity<String> createContact(@Valid @RequestBody ContactRequest req) {
        contactService.saveContact(req);
        return ResponseEntity.ok("Success");
    }
}
