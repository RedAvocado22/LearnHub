package com.learnhub.payment;

import com.learnhub.course.CourseRepository;
import com.learnhub.user.User;
import com.learnhub.user.UserRepository;
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
    private UserRepository userRepository;

    public List<Enrollment> getNumberOffStudentRegisterInMonth() {
        LocalDateTime now = LocalDateTime.now();
        return enrollmentRepository.getCountOfStudentRegister(now.getMonthValue());
    }

    public void createEnrollment(User user, Long id) {
        Enrollment enrollment = Enrollment.builder().
                course(courseRepository.findcoursebyid(id)).
                build();
    }

}
