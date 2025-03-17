package com.learnhub.course.chapter.lesson;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonMaterialRepository extends CrudRepository<LessonMaterial, Long> {
}
