package com.learnhub.user.student;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import com.learnhub.user.User;
import com.learnhub.user.UserRole;

import java.time.LocalDateTime;

@Entity
@Table(name = "student_profile")
public class Student extends User {
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private StudentType type;

    @Column(name = "school")
    private String school;

    public Student() {
    }

    public Student(String email, String firstName, String lastName, String password, UserRole role, boolean active, StudentType type) {
        super(email, firstName, lastName, password, role, active);
        this.type = type;
    }

    public Student(String email,
                   String firstName, String lastName,
                   String password,
                   UserRole role, boolean active,
                   LocalDateTime createdAt,
                   String phoneNo,
                   String address, String city,
                   StudentType type, String school) {
        super(email, firstName, lastName, password, role, active, createdAt, phoneNo, address, city);
        this.type = type;
        this.school = school;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public StudentType getType() {
        return type;
    }

    public void setType(StudentType type) {
        this.type = type;
    }
}
