package com.learnhub.user.student;

import com.learnhub.course.Course;
import com.learnhub.payment.Enrollment;
import jakarta.persistence.*;
import com.learnhub.user.User;
import com.learnhub.user.UserRole;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "student_profile")
public class Student extends User {
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false)
    private StudentType type;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Enrollment> enrollments;
    @Column(name = "school")
    private String school;


    public Student(String email, String firstName, String lastName, String password, boolean active, StudentType type, String school) {
        super(email, firstName, lastName, password, UserRole.STUDENT, active);
        this.type = type;
        this.school = school;
    }

    public Student(String email, String firstName, String lastName, String password, boolean active, String phone, String address, String city, StudentType type, String school) {
        super(email, firstName, lastName, password, UserRole.STUDENT, active, phone, address, city);
        this.type = type;
        this.school = school;
    }


}
