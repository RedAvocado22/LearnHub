package com.learnhub.course;

import java.math.BigDecimal;
import java.util.List;
import jakarta.validation.Valid;
import com.learnhub.course.dto.AddChapterMaterialRequest;
import com.learnhub.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/api/v1/courses")
public class CourseController {
    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }
    
    @PutMapping("/teacher")
    public ResponseEntity<String> updateCourse(@AuthenticationPrincipal User user, @RequestBody UpdateCourseRequest req) {
        courseService.updateCourseOfTeacher(user, req);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/teacher")
    public ResponseEntity<String> createCourse(@AuthenticationPrincipal User user,
                                               @RequestParam("name") String name,
                                               @RequestParam("category") Category category,
                                               @RequestParam("price") BigDecimal price,
                                               @RequestParam("description") String description,
                                               @RequestParam("image") MultipartFile image) {
        courseService.addCourseForTeacher(user, name, category, price, description, image);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/chapters/{id}/materials")
    public ResponseEntity<Long> addMaterialToChapter(
            @PathVariable("id") Long chapterId,
            @Valid @RequestBody AddChapterMaterialRequest req) {
        return ResponseEntity.ok(courseService.addMaterialToChapter(chapterId, req));
    }

    @PostMapping("/chapters/materials/lessons/{id}")
    public ResponseEntity<String> addLessonFiles(
            @PathVariable("id") Long lessonId,
            @RequestParam("video") MultipartFile video,
            @RequestParam(name = "materialNames", required = false) List<String> materialNames,
            @RequestParam(name = "materialFiles", required = false) List<MultipartFile> materialFiles) {
        courseService.addLessonFiles(lessonId, video, materialNames, materialFiles);
        return ResponseEntity.ok("String");
    }
}
