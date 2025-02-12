package com.learnhub.user.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    public Student getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }

    public void changeProfile(Student student) {
        studentRepository.save(student);
    }

}
