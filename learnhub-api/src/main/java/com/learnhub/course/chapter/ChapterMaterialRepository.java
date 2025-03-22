package com.learnhub.course.chapter;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChapterMaterialRepository extends JpaRepository<ChapterMaterial, Long> {
}
