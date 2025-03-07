package com.learnhub.user.teacher;

import com.learnhub.user.exception.UserNotFoundException;
import com.learnhub.util.mail.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Autowired
    public TeacherService(
            TeacherRepository teacherRepository,
            PasswordEncoder passwordEncoder,
            EmailService emailService) {
        this.teacherRepository = teacherRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(String.format("Teacher with id %d not found.", id)));
    }

    @Transactional
    public Long addTeacherWithDefaultPassword(AddTeacherRequest req) {
        String defaultPw = "ABC@123";
        Teacher teacher = teacherRepository.save(new Teacher(
                req.email(),
                req.firstName(),
                req.lastName(),
                passwordEncoder.encode(defaultPw),
                true,
                req.phone(),
                null,
                null,
                req.major(),
                null,
                null,
                null));
        emailService.sendAccountCreatedEmail(teacher.getEmail(), defaultPw);
        return teacher.getId();
    }

    public void updateTeacher(Teacher teacher, UpdateTeacherRequest req) {
        teacher.setMajor(req.major());
        teacher.setWebsite(req.website());
        teacher.setAbout(req.about());
        teacher.setSchool(req.school());
        teacherRepository.save(teacher);
    }
}
