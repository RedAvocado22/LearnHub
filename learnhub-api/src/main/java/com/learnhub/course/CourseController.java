package com.learnhub.course;

import com.learnhub.course.chapter.ChapterService;
import com.learnhub.course.chapter.lesson.dto.*;
import com.learnhub.course.dto.ManagerCourseResponse;
import com.learnhub.course.dto.ManagerCourseResquest;
import com.learnhub.course.dto.ManagerCoursesResponse;
import com.learnhub.course.dto.UpdateCourseRequest;
import com.learnhub.user.User;
import com.learnhub.util.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.util.List;

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
