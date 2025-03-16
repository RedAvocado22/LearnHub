package com.learnhub.course.chapter.lesson;

import com.learnhub.course.ChapterService;
import com.learnhub.course.chapter.AddChapterRequest;
import com.learnhub.course.chapter.Chapter;
import com.learnhub.course.chapter.ChapterResponse;
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
    @GetMapping("/{id}")
    public ResponseEntity<List<ChapterResponse>> getAllChapters(@PathVariable Long id) {
        return ResponseEntity.ok(
                chapterService.getAllChaptersInCourse(id)
                        .stream()
                        .map(objectMapper::toChapterResponse)
                        .toList());
    }

    @PostMapping("/{id}")
    public void addChapter(@PathVariable Long id, @RequestBody AddChapterRequest request) {
        chapterService.addChapter(request, id);
    }

    //con cai nay la id cua chapter
    @DeleteMapping("/{id}")
    public void deleteChapter(@PathVariable Long id) {
        chapterService.deleteChapter(id);
    }

    @PostMapping("/lessons/{id}")
    public void addLesson(@PathVariable Long id, ) {
        Chapter chapter = chapterService.getChapter(id);

        chapter.getLessons().add(new Lesson());
    }
}
