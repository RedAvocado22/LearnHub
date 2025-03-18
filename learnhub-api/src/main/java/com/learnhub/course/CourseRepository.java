package com.learnhub.course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query(value = "select * from course where id = :id", nativeQuery = true)
    Course findcoursebyid(@Param("id") Long id);
}
