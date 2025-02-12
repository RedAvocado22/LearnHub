package com.learnhub.user.teacher;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepositery extends JpaRepository<Teacher, Long> {
    public Teacher findTeacherById(Long id);
}
