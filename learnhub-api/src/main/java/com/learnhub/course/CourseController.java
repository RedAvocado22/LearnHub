package com.learnhub.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path="/api/v1/courses")
public class CourseController {
    public static record CourseResponse(Long id, String name, double price) {}
    @Autowired
    private CourseService courseService;

    @GetMapping
    public List<CourseResponse> getAllCourses() {
        return courseService.getAllCourses().stream().map(course -> new CourseResponse(course.getId(), course.getName(), course.getPrice())).collect(Collectors.toList());
    }
}
