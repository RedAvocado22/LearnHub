package com.learnhub.course;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "quiz_attempt")
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

    public QuizAttempt() {}

    public QuizAttempt(Quiz quiz, Double grade) {
        this.quiz = quiz;
        this.grade = grade;
        this.questions = new ArrayList<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Quiz getQuiz() {
        return quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public Double getGrade() {
        return grade;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public List<AnsweredQuestion> getQuestions() {
        return questions;
    }

    public void setQuestions(List<AnsweredQuestion> questions) {
        this.questions = questions;
    }
}
