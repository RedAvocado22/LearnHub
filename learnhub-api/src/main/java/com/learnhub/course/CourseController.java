package com.learnhub.course;

import java.math.BigDecimal;
import java.util.List;

import com.learnhub.course.category.Category;
import com.learnhub.course.chapter.ChapterService;
import com.learnhub.course.chapter.lesson.dto.AddChapterRequest;
import com.learnhub.course.chapter.lesson.dto.ChapterResponse;
import com.learnhub.course.dto.UpdateCourseRequest;
import com.learnhub.util.ObjectMapper;
import jakarta.validation.Valid;
import com.learnhub.course.chapter.lesson.dto.AddChapterMaterialRequest;
import com.learnhub.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/api/v1/courses")
public class CourseController {
    private final CourseService courseService;
    private final ChapterService chapterService;
    private final ObjectMapper objectMapper;

    @Autowired
    public CourseController(CourseService courseService, ChapterService chapterService, ObjectMapper objectMapper) {
        this.courseService = courseService;
        this.chapterService = chapterService;
        this.objectMapper = objectMapper;
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

    //get voi post deu la id cua course
    @GetMapping("chapters/{courseId}")
    public ResponseEntity<List<ChapterResponse>> getAllChapters(@PathVariable Long courseId) {
        return ResponseEntity.ok(
                chapterService.getAllChaptersInCourse(courseId)
                        .stream()
                        .map(objectMapper::toChapterResponse)
                        .toList());
    }

    @PostMapping("{courseId}/chapters")
    public ResponseEntity<String> addChapter(@PathVariable Long courseId, @RequestBody AddChapterRequest request) {
        Long id = chapterService.addChapter(request, courseId);
        return ResponseEntity.ok("Successfully added chapter: " + id);
    }

    //con cai nay la id cua chapter
    @DeleteMapping("chapters/{chapterId}")
    public void deleteChapter(@PathVariable Long chapterId) {
        chapterService.deleteChapter(chapterId);
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
