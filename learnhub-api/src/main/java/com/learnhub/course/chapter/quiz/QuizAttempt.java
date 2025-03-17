package com.learnhub.course.chapter.quiz;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

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
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    private Double grade;
    private final LocalDateTime submittedAt = LocalDateTime.now();

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "quizAttempt")
    private List<AnsweredQuestion> questions;

    public QuizAttempt(Quiz quiz, Double grade) {
        this.quiz = quiz;
        this.grade = grade;
    }
}
