package com.learnhub.user.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    private final StudentRepository studentRepository;

    @Autowired
    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public void updateStudent(Student student, UpdateStudentRequest req) {
        student.setFirstName(req.firstName());
        student.setLastName(req.lastName());
        student.setType(req.type());
        studentRepository.save(student);
    }
}
