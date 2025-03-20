package com.learnhub.payment;

import com.learnhub.common.exception.ResourceNotFoundException;
import com.learnhub.course.Course;
import com.learnhub.course.CourseRepository;
import com.learnhub.enrollment.Enrollment;
import com.learnhub.enrollment.EnrollmentStatus;
import com.learnhub.user.UserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Service
public class EnrollmentService {
    EnrollmentRepository enrollmentRepository;
    private CourseRepository courseRepository;
    private UserService userService;

    @Autowired
    public EnrollmentService(CourseRepository courseRepository, EnrollmentRepository enrollmentRepository, UserService userService) {
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.userService = userService;
    }

    public List<Enrollment> getNumberOffStudentRegisterInMonth() {
        LocalDateTime now = LocalDateTime.now();
        return enrollmentRepository.getCountOfStudentRegister(now.getMonthValue());
    }

    public void createEnrollment(Long userId, Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Can't find course"));
        System.out.println(userId + " " + courseId);
        enrollmentRepository.save(Enrollment.builder().
                student(userService.getUserById(userId)).
                status(EnrollmentStatus.IN_PROGRESS).
                course(course).
                build()
        );

    }

}
