package com.learnhub.course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query(value = "select * from course", nativeQuery = true)
    List<Course> findAll();

    @Query(value = "select * from course where teacher_id = :id", nativeQuery = true)
    List<Course> findByTeacherID(@Param("id") Long id);
}
