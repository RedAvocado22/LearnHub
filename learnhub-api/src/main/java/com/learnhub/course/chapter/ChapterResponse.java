package com.learnhub.course.chapter;

public record ChapterResponse(Long id, String title) {
    public static ChapterResponse from(Chapter chapter) {
        return new ChapterResponse(chapter.getId(), chapter.getTitle());
    }
}

