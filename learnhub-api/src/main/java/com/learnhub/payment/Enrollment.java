package com.learnhub.payment;


import com.learnhub.course.Course;
import com.learnhub.user.student.Student;
import com.learnhub.user.teacher.Teacher;
import jakarta.persistence.*;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Entity
@Table(name = "enrollment")
public class Enrollment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "enrolled_at")
    private LocalDateTime createdAt = LocalDateTime.now();
    @Column(name = "finished_at")
    private LocalDateTime finishAt;
    @Column(name = "status")
    private String status;
    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    private Course course;
}
