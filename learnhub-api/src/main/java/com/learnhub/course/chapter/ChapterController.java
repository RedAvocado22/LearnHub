package com.learnhub.course.chapter;

import com.learnhub.course.ChapterService;
import com.learnhub.util.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/chapters")
public class ChapterController {
    ChapterService chapterService;
    ObjectMapper objectMapper;

    @Autowired
    public ChapterController(ChapterService chapterService, ObjectMapper objectMapper) {
        this.chapterService = chapterService;
        this.objectMapper = objectMapper;
    }

    //get voi post deu la id cua course
    @GetMapping("/{courseId}")
    public ResponseEntity<List<ChapterResponse>> getAllChapters(@PathVariable Long courseId) {
        return ResponseEntity.ok(
                chapterService.getAllChaptersInCourse(courseId)
                        .stream()
                        .map(objectMapper::toChapterResponse)
                        .toList());
    }

    @PostMapping("/{courseId}")
    public ResponseEntity<String> addChapter(@PathVariable Long courseId, @RequestBody AddChapterRequest request) {
        Long id = chapterService.addChapter(request, courseId);
        return ResponseEntity.ok("Successfully added chapter: " + id);
    }

    //con cai nay la id cua chapter
    @DeleteMapping("/{chapterId}")
    public void deleteChapter(@PathVariable Long chapterId) {
        chapterService.deleteChapter(chapterId);
    }
}
