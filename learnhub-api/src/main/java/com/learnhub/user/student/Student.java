package com.learnhub.user.student;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import com.learnhub.user.User;
import com.learnhub.user.UserRole;

@Entity
@Table(name = "student_profile")
public class Student extends User {
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private StudentType type;

    public Student() {}

    public Student(String email, String firstName, String lastName, String password, UserRole role,
            boolean active, StudentType type) {
        super(email, firstName, lastName, password, role, active);
        this.type = type;
    }

    public StudentType getType() {
        return type;
    }

    public void setType(StudentType type) {
        this.type = type;
    }
}
