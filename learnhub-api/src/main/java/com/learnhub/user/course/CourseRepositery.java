package com.learnhub.user.course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepositery extends JpaRepository<Course,Long>{

    @Query(value = "select * from course where teacher_id =  ?1",nativeQuery = true)
    public List<Course>getCourseByTeacherID(Long id);


}
