package com.learnhub.common;

import java.util.List;

import com.learnhub.course.Category;
import com.learnhub.course.CategoryRepository;
import jakarta.validation.Valid;
import com.learnhub.common.dto.PublicCourseResponse;
import com.learnhub.common.dto.PublicTeacherResponse;
import com.learnhub.contact.ContactService;
import com.learnhub.contact.dto.AddContactRequest;
import com.learnhub.course.CourseService;
import com.learnhub.user.UserService;
import com.learnhub.util.ObjectMapper;
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
    private final ObjectMapper objectMapper;
    private final CourseService courseService;
    private final UserService userService;
    private final ContactService contactService;
    private final CategoryRepository categoryRepository;


    @Autowired
    public PublicController(
            ObjectMapper objectMapper,
            CourseService courseService,
            UserService userService,
            ContactService contactService,
            CategoryRepository categoryRepository) {
        this.objectMapper = objectMapper;
        this.courseService = courseService;
        this.userService = userService;
        this.contactService = contactService;
        this.categoryRepository = categoryRepository;

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
}
