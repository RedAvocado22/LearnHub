package com.learnhub.enrollment;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import com.learnhub.course.Course;
import com.learnhub.user.student.StudentProfile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "enrollment")
@IdClass(EnrollmentKey.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Enrollment {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private StudentProfile student;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private EnrollmentStatus status;

    @OneToMany(mappedBy = "enrollment", cascade = CascadeType.ALL, orphanRemoval = true)
    @Default
    private List<FinishedMaterial> finishedMaterials = new ArrayList<>();

    @OneToMany(mappedBy = "enrollment", cascade = CascadeType.ALL, orphanRemoval = true)
    @Default
    private List<QuizAttempt> quizAttempts = new ArrayList<>();

    @Column(name = "enrolled_at")
    private final LocalDateTime enrolledAt = LocalDateTime.now();

    @Column(name = "finished_at")
    private LocalDateTime finishedAt;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class EnrollmentKey implements Serializable {
    private Long course;
    private Long student;
}
