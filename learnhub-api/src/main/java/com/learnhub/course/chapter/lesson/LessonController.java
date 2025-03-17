package com.learnhub.course.chapter.lesson;

import com.learnhub.course.ChapterService;
import com.learnhub.util.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/lessons")
public class LessonController {
    ChapterService chapterService;
    ObjectMapper objectMapper;

    @Autowired
    public LessonController(ChapterService chapterService, ObjectMapper objectMapper) {
        this.chapterService = chapterService;
        this.objectMapper = objectMapper;
    }


}
