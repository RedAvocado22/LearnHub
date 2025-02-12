package com.learnhub.user.teacher;

import com.learnhub.course.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/teacher")
public class TeacherController {
    @Autowired
    TeacherService teacherService;

    @Autowired
    CourseService courseService;

    @GetMapping("/{id}")
    public Teacher teacherProfile(@PathVariable Long id){
        return teacherService.getTeacherById(id);
    }

}
