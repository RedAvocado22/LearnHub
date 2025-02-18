package com.learnhub.user.student;

import java.time.LocalDateTime;
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

    @Column(name = "school")
    private String school;

    public Student() {
    }

    public Student(String email,
                   String firstName, String lastName,
                   String password, boolean active,
                   LocalDateTime createdAt,
                   String phoneNo,
                   String address, String city,
                   StudentType type, String school) {
        super(email, firstName, lastName, password, UserRole.STUDENT, active, createdAt, phoneNo, address, city);
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
