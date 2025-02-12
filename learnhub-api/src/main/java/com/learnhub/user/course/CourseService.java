package com.learnhub.user.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    @Autowired
    CourseRepositery repositery ;

    public List<Course>getCourseByTeacherId(Long id){
        return repositery.getCourseByTeacherID(id);
    }

}
