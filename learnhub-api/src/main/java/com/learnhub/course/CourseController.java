package com.learnhub.course;

import java.math.BigDecimal;
import java.util.List;
import jakarta.validation.Valid;
import com.learnhub.course.chapter.ChapterService;
import com.learnhub.course.chapter.lesson.dto.AddChapterMaterialRequest;
import com.learnhub.course.chapter.lesson.dto.AddChapterRequest;
import com.learnhub.course.chapter.lesson.dto.ChapterResponse;
import com.learnhub.course.chapter.lesson.dto.DeleteLessonFileRequest;
import com.learnhub.course.chapter.lesson.dto.UpdateChapterMaterialRequest;
import com.learnhub.course.dto.UpdateCourseRequest;
import com.learnhub.user.User;
import com.learnhub.util.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
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

    @PutMapping("/{id}/teacher")
    public ResponseEntity<String> updateCourse(
            @AuthenticationPrincipal User user,
            @PathVariable("id") Long courseId,
            @RequestPart(name = "metadata", required = false) UpdateCourseRequest metadata,
            @RequestPart(name = "image", required = false) MultipartFile image) {
        courseService.updateCourseOfTeacher(user, courseId, metadata, image);
        return ResponseEntity.ok("Success");
    }

    @PostMapping("/teacher")
    public ResponseEntity<String> createCourse(@AuthenticationPrincipal User user,
                                               @RequestParam("name") String name,
                                               @RequestParam("categoryId") Long categoryId,
                                               @RequestParam("price") BigDecimal price,
                                               @RequestParam("description") String description,
                                               @RequestParam("image") MultipartFile image) {
        courseService.addCourseForTeacher(user, name, categoryId, price, description, image);
        return ResponseEntity.ok("Success");
    }

    //get voi post deu la id cua course
    @GetMapping("/chapters/{courseId}")
    public ResponseEntity<List<ChapterResponse>> getAllChapters(@PathVariable Long courseId) {
        return ResponseEntity.ok(
                chapterService.getAllChaptersInCourse(courseId)
                        .stream()
                        .map(objectMapper::toChapterResponse)
                        .toList());
    }

    @PostMapping("/{courseId}/chapters")
    public ResponseEntity<String> addChapter(@PathVariable Long courseId, @RequestBody AddChapterRequest request) {
        Long id = chapterService.addChapter(request, courseId);
        return ResponseEntity.ok("Successfully added chapter: " + id);
    }

    //con cai nay la id cua chapter
    @DeleteMapping("/chapters/{chapterId}")
    public void deleteChapter(@PathVariable Long chapterId) {
        courseService.deleteChapter(chapterId);
    }

    @PostMapping("/chapters/{id}/materials")
    public ResponseEntity<Long> addMaterialToChapter(
            @PathVariable("id") Long chapterId,
            @Valid @RequestBody AddChapterMaterialRequest req) {
        return ResponseEntity.ok(courseService.addMaterialToChapter(chapterId, req));
    }

    @PutMapping("/chapters/materials/{id}")
    public ResponseEntity<String> updateMaterial(@PathVariable("id") Long id, @RequestBody UpdateChapterMaterialRequest req) {
        courseService.updateChapterMaterial(id, req);
        return ResponseEntity.ok("Success");
    }

    @DeleteMapping("/chapters/materials/{id}")
    public ResponseEntity<String> deleteMaterial(@PathVariable("id") Long id) {
        courseService.deleteChapterMaterial(id);
        return ResponseEntity.ok("Success");
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

    @PutMapping("/chapters/materials/lessons/{id}")
    public ResponseEntity<String> updateLessonFiles(
            @PathVariable("id") Long lessonId,
            @RequestParam(name = "video", required = false) MultipartFile video,
            @RequestParam(name = "materialNames", required = false) List<String> materialNames,
            @RequestParam(name = "materialFiles", required = false) List<MultipartFile> materialFiles) {
        courseService.updateLessonFiles(lessonId, video, materialNames, materialFiles);
        return ResponseEntity.ok("Success");
    }

    @DeleteMapping("/chapters/materials/lessons/{id}")
    public ResponseEntity<String> deleteLessonFiles(
            @PathVariable("id") Long lessonId,
            @RequestBody DeleteLessonFileRequest req) {
        if (courseService.deleteLessonFiles(lessonId, req.fileUrl())) {
            return ResponseEntity.ok("Success");
        }
        return ResponseEntity.badRequest().build();
    }
}
