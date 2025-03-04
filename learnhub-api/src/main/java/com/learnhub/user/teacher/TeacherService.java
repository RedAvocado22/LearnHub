package com.learnhub.user.teacher;

import com.learnhub.user.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(String.format("Teacher with id %d not found.", id)));
    }

    public void updateTeacher(Teacher teacher, UpdateTeacherRequest req) {
        teacher.setMajor(req.major());
        teacher.setWebsite(req.website());
        teacher.setAbout(req.about());
        teacher.setSchool(req.school());
        teacherRepository.save(teacher);
    }
}
