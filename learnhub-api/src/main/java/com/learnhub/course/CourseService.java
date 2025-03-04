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

    public Course updateCourse(Course course, UpdateCourseRequest updateCourseRequest) {
        course.setName(updateCourseRequest.name());
        course.setCategory(updateCourseRequest.category());
        course.setPrice(updateCourseRequest.price());

        switch (updateCourseRequest.status()) {
            case PUBLIC:
                course.setStatus(CourseStatus.PUBLIC);
                course.setUpdatedAt(LocalDateTime.now());
                break;
            case PRIVATE:
                course.setStatus(CourseStatus.PRIVATE);
                course.setCreatedAt(LocalDateTime.now());
                break;
            case ARCHIVED:
                course.setStatus(CourseStatus.ARCHIVED);
                course.setArchivedAt(LocalDateTime.now());
                break;
            case PENDING:
                course.setStatus(CourseStatus.PENDING);
                course.setUpdatedAt(LocalDateTime.now());
                break;
            case CANCELLED:
                course.setStatus(CourseStatus.CANCELLED);
                course.setCancelledAt(LocalDateTime.now());
                break;
        }
        return courseRepository.save(course);
    }
}
