package com.learnhub.course;

import com.learnhub.course.chapter.AddChapterRequest;
import com.learnhub.course.chapter.Chapter;
import com.learnhub.course.chapter.ChapterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChapterService {
    private final ChapterRepository chapterRepository;
    private final CourseRepository courseRepository;

    @Autowired
    public ChapterService(ChapterRepository chapterRepository, CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
        this.chapterRepository = chapterRepository;
    }

    public List<Chapter> getAllChaptersInCourse(Long id) {
        return courseRepository.getReferenceById(id).getChapters();
    }

    public Long addChapter(AddChapterRequest req, Long id) {
        Course course = courseRepository.findById(id).orElseThrow(IllegalArgumentException::new);

        Chapter chapter = Chapter.builder().title(req.title()).course(course).build();

        Chapter savedChapter = chapterRepository.save(chapter);
        return savedChapter.getId();
    }

    public void deleteChapter(Long id) {
        chapterRepository.deleteById(id);
    }

    public Chapter getChapter(Long id) {
        return chapterRepository.findById(id).orElseThrow(IllegalArgumentException::new);
    }
}
