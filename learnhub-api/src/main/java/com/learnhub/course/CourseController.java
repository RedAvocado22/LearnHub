package com.learnhub.course;

import java.math.BigDecimal;
import java.util.List;

import com.learnhub.common.exception.ResourceNotFoundException;
import com.learnhub.course.category.Category;
import com.learnhub.course.chapter.ChapterService;
import com.learnhub.course.chapter.lesson.dto.AddChapterRequest;
import com.learnhub.course.chapter.lesson.dto.ChapterResponse;
import com.learnhub.course.dto.ManagerCourseResponse;
import com.learnhub.course.dto.ManagerCourseResquest;
import com.learnhub.course.dto.ManagerCoursesResponse;
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

    @GetMapping("/manager")
    public ResponseEntity<List<ManagerCoursesResponse>> getManagerCourses() {
        return ResponseEntity.ok(
                courseService.getAllCourses().stream()
                        .filter(
                                course -> course.getStatus().equals(CourseStatus.PENDING) ||
                                        course.getStatus().equals(CourseStatus.CANCELLED) ||
                                        course.getStatus().equals(CourseStatus.PUBLIC)
                        )
                        .map(objectMapper::toManagerCoursesResponse)
                        .toList()
        );
    }

    @PutMapping("/manager")
    public ResponseEntity<String> changeCourseStatus(@RequestBody ManagerCourseResquest req) {
        Long id = courseService.changeCourseStatus(req.id(), req.status());
        return ResponseEntity.ok("Success update course: " + id);
    }

    @GetMapping("/manager/{id}")
    public ResponseEntity<ManagerCourseResponse> getManagerCourse(@PathVariable Long id) {
        return courseService.getAllCourses().stream()
                .filter(course -> course.getId() == id)
                .map(objectMapper::toManagerCourseResponse)
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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

    @DeleteMapping("/chapters/materials/{id}")
    public ResponseEntity<String> removeMaterialFromChapter(@PathVariable Long id) {
        courseService.deleteMaterial(id);
        return ResponseEntity.ok("Success");
    }

    @DeleteMapping("/chapters/materials/lessons/materials/{id}")
    public ResponseEntity<String> removeLessonMaterial(@PathVariable Long id) {
        courseService.deleteLessonMaterial(id);
        return ResponseEntity.ok("Success");
    }
}
