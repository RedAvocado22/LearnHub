package com.learnhub.enrollment;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.learnhub.course.chapter.ChapterMaterial;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "quiz_attempt")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizAttempt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumns({
        @JoinColumn(name = "course_id", referencedColumnName = "course_id", nullable = false),
        @JoinColumn(name = "student_id", referencedColumnName = "student_id", nullable = false)
    })
    private Enrollment enrollment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id", nullable = false)
    private ChapterMaterial quiz;

    @Column(name = "total_correct", nullable = false)
    private Integer totalCorrect;

    @Column(name = "passed", nullable = false)
    private Boolean passed;

    @Column(name = "submitted_at")
    private final LocalDateTime submittedAt = LocalDateTime.now();
}
