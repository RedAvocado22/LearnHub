package com.learnhub.user.teacher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {
    private TeacherRepositery teacherRepositery;

    @Autowired
    public TeacherService(TeacherRepositery teacherRepositery) {
        this.teacherRepositery = teacherRepositery;
    }

    public Teacher getTeacherById(Long id) {
        return teacherRepositery.findTeacherById(id);
    }

    public Teacher getTeacherByEmail(String email) {
        return teacherRepositery.findTeacherByEmail(email);
    }

    public void editProfile(Teacher profile) {
        teacherRepositery.save(profile);
    }
}
