package com.learnhub.course.chapter.lesson.dto;

import com.learnhub.course.chapter.Chapter;
import com.learnhub.course.chapter.ChapterMaterial;
import com.learnhub.course.chapter.MaterialType;

import java.util.List;

public record ChapterResponse(Long id, String title, List<ChapterMaterialResponse> materials) {
    public static ChapterResponse from(Chapter chapter) {
        return new ChapterResponse(
                chapter.getId(),
                chapter.getTitle(),
                chapter.getMaterials().stream().map(ChapterMaterialResponse::from).toList()
        );
    }

    public record ChapterMaterialResponse(Long id, String title, MaterialType type) {
        public static ChapterMaterialResponse from(ChapterMaterial material) {
            return new ChapterMaterialResponse(material.getId(), material.getName(), material.getType());
        }
    }
}

