package com.learnhub.payment;

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

    public List<Enrollment> getNumbeerOffStudentRegisterInMonth() {
        LocalDateTime now = LocalDateTime.now();
        return enrollmentRepository.getCountOfStudentRegister(now.getMonthValue());
    }

    public void createEnrollment() {

    }

}
