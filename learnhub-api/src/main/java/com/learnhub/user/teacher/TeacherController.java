package com.learnhub.user.teacher;

import com.learnhub.user.course.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/teacher")
public class TeacherController {
    public static record CourseResponse(Long id, String name, double price){}
    @Autowired
    TeacherService teacherService;

    @Autowired
    CourseService courseService;

    @GetMapping("/{id}")
    public Teacher teacherProfile(@PathVariable Long id){
        return teacherService.getTeacherById(id);
    }

    @GetMapping("/courses/{id}")
    public List<CourseResponse> getListCourse(Long id){
        return courseService.getCourseByTeacherId(id).stream().map(course -> new CourseResponse(course.getId(), course.getName(), course.getPrice())).toList();
    }


}
