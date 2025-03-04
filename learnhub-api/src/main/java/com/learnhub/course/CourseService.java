package com.learnhub.course;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService {
    private CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public List<Course> getAllPublicCourses() {
        return courseRepository.findAll().stream().filter(course -> course.getStatus() == CourseStatus.PUBLIC).toList();
    }

    public Course findCourseById(Long id) {
        return courseRepository.findcoursebyid(id);
    }

    public List<Course> getAllCourseByStatus(CourseStatus status) {
        return courseRepository.findAll().stream().filter(course -> course.getStatus() == status).toList();
    }

    public List<Course> getCoursesByTeacher(Long id) {
        return courseRepository.findByTeacherID(id);
    }

    public void updateCourseStatus(Course course, CourseStatus status) {
        course.setStatus(status);
        courseRepository.save(course);
    }

}
