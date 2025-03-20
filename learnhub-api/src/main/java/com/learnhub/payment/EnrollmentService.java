package com.learnhub.payment;

import com.learnhub.course.CourseRepository;
import com.learnhub.enrollment.Enrollment;
import com.learnhub.enrollment.EnrollmentStatus;
import com.learnhub.user.User;
import com.learnhub.user.UserRepository;
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
    @Autowired
    EnrollmentRepository enrollmentRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private UserService userService;

    public List<Enrollment> getNumberOffStudentRegisterInMonth() {
        LocalDateTime now = LocalDateTime.now();
        return enrollmentRepository.getCountOfStudentRegister(now.getMonthValue());
    }

    public void createEnrollment(Long userId, Long courseId) {
        Enrollment enrollment = Enrollment.builder().
                student(userService.getUserById(userId)).
                status(EnrollmentStatus.IN_PROGRESS).
                course(courseRepository.findcoursebyid(courseId)).
                build();
    }

}
