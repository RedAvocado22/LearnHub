package com.learnhub.common;

import java.util.List;

import com.learnhub.payment.EnrollmentService;
import jakarta.validation.Valid;
import com.learnhub.contact.AddContactRequest;
import com.learnhub.contact.ContactService;
import com.learnhub.course.CourseService;
import com.learnhub.user.teacher.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/api/v1/public")
public class PublicController {
    private final CourseService courseService;
    private final TeacherService teacherService;
    private final ContactService contactService;
    private final EnrollmentService enrollmentService;

    @Autowired
    public PublicController(
            CourseService courseService,
            TeacherService teacherService,
            ContactService contactService, EnrollmentService enrollmentService
    ) {
        this.courseService = courseService;
        this.teacherService = teacherService;
        this.contactService = contactService;
        this.enrollmentService = enrollmentService;
    }

    @GetMapping("/courses")
    public ResponseEntity<List<CourseListResponse>> getAllPublishedCourses() {
        return ResponseEntity.ok(courseService.getAllPublicCourses().stream()
                .map(CourseListResponse::from).toList());
    }

    @GetMapping("/coursesId/{id}")
    public ResponseEntity<CourseListResponse> getCourseByCourseId(@PathVariable("id") Long id) {
        return ResponseEntity.ok(CourseListResponse.from(courseService.getCourseById(id)));
    }


    @GetMapping("/teachers/{id}")
    public ResponseEntity<TeacherDetailsResponse> getTeacher(@PathVariable("id") Long id) {
        return ResponseEntity.ok(TeacherDetailsResponse.from(teacherService.getTeacherById(id)));
    }


    @PostMapping("/contacts")
    public ResponseEntity<String> createContact(@Valid @RequestBody AddContactRequest req) {
        contactService.saveContact(req);
        return ResponseEntity.ok("Success");
    }
}
