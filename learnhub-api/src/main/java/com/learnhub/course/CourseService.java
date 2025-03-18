package com.learnhub.course;

import java.time.LocalDateTime;
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

    public List<Course> getAllPublicCourses() {
        return courseRepository.findAll().stream().filter(course -> course.getStatus() == CourseStatus.PUBLIC).toList();
    }

    public List<Course> getCoursesByTeacher(Long id) {
        return courseRepository.findByTeacherID(id);
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    public Course updateCourse(Course course) {
        return courseRepository.save(course);
    }

    public List<Course> getAllCoursesExceptPrivate() {

        return courseRepository.findAll().stream().filter(
                        course -> course.getStatus() != CourseStatus.PRIVATE)
                .toList();
    }

    public List<Course> getAllCourseByStatus(CourseStatus courseStatus) {
        return courseRepository.findAll().stream().filter(course -> course.getStatus() == courseStatus).toList();
    }

    public void updateCourseStatus(Course course, CourseStatus status) {
        course.setStatus(status);
        courseRepository.save(course);
    }
}
