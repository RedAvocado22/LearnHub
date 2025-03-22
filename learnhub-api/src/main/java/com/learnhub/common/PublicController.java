package com.learnhub.common;

import com.learnhub.common.dto.LandingPageResponse;
import com.learnhub.common.dto.PublicCourseResponse;
import com.learnhub.common.dto.PublicTeacherResponse;
import com.learnhub.contact.ContactService;
import com.learnhub.contact.dto.AddContactRequest;
import com.learnhub.course.Course;
import com.learnhub.course.CourseService;
import com.learnhub.course.category.Category;
import com.learnhub.course.category.CategoryRepository;
import com.learnhub.enrollment.EnrollmentService;
import com.learnhub.user.User;
import com.learnhub.user.UserRole;
import com.learnhub.user.UserService;
import com.learnhub.util.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/public")
public class PublicController {
    private final ObjectMapper objectMapper;
    private final CourseService courseService;
    private final UserService userService;
    private final ContactService contactService;
    private final CategoryRepository categoryRepository;
    private final EnrollmentService enrollmentService;


    @Autowired
    public PublicController(
            ObjectMapper objectMapper,
            CourseService courseService,
            UserService userService,
            ContactService contactService,
            CategoryRepository categoryRepository, EnrollmentService enrollmentService) {
        this.objectMapper = objectMapper;
        this.courseService = courseService;
        this.userService = userService;
        this.contactService = contactService;
        this.categoryRepository = categoryRepository;
        this.enrollmentService = enrollmentService;
    }

    @GetMapping("/courses")
    public ResponseEntity<List<PublicCourseResponse>> getAllPublishedCourses() {
        return ResponseEntity.ok(
                courseService.getAllPublicCourses()
                        .stream()
                        .map(objectMapper::toPublicCourseResponse)
                        .toList());
    }

    @GetMapping("/teachers/{id}")
    public ResponseEntity<PublicTeacherResponse> getTeacher(@PathVariable("id") Long id) {
        return ResponseEntity.ok(objectMapper.toPublicTeacherResponse(userService.getTeacherById(id)));
    }

    @PostMapping("/contacts")
    public ResponseEntity<String> createContact(@Valid @RequestBody AddContactRequest req) {
        contactService.saveContact(req);
        return ResponseEntity.ok("Success");
    }

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/landing-page")
    public ResponseEntity<LandingPageResponse> getLandingPageInformation() {
        List<User> users = userService.getAllExceptAdmin();

        long studentCount = users.stream()
                .filter(user -> UserRole.STUDENT.equals(user.getRole()))
                .count();

        long teacherCount = users.stream()
                .filter(user -> UserRole.TEACHER.equals(user.getRole()))
                .count();

        long courseCount = courseService.getAllCourses().stream().count();

        List<Course> courses = courseService.getNewestCourses();

        return ResponseEntity.ok(new LandingPageResponse(
                studentCount, teacherCount, courseCount,
                courses.stream().map(LandingPageResponse.CourseResponse::from).toList()
        ));
    }
}
