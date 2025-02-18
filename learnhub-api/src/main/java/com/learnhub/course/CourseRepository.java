package com.learnhub.course;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query(value = "select * from course where teacher_id = :id", nativeQuery = true)
    List<Course> findByTeacherID(@Param("id") Long id);
}
