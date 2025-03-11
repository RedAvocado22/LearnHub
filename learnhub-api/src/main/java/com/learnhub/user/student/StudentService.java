package com.learnhub.user.student;

import com.learnhub.user.exception.UserNotFoundException;
import com.learnhub.util.mail.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Autowired
    public StudentService(
            StudentRepository studentRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService) {
        this.studentRepository = studentRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(String.format("User with id %d does not exists", id)));
    }

    public Long addStudentWithDefaultPassword(AddStudentRequest req) {
        String defaultPw = "ABC@123";
        Student student = studentRepository.save(new Student(
                    req.email(),
                    req.firstName(),
                    req.lastName(),
                    passwordEncoder.encode(defaultPw),
                    true,
                    req.phone(),
                    null,
                    null,
                    req.studentType(),
                    null));
        emailService.sendAccountCreatedEmail(student.getEmail(), defaultPw);
        return student.getId();
    }

    public void updateStudent(Student student, UpdateStudentRequest req) {
        student.setSchool(req.school());
        student.setType(req.type());
        studentRepository.save(student);
    }
}
