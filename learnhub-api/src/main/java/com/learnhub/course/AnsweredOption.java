package com.learnhub.course;

import jakarta.persistence.*;

@Entity
@Table(name = "answered_question")
public class AnsweredOption {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "answered_question_id")
    private AnsweredQuestion answeredQuestion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "option_id")
    private QuestionOption questionOption;

    private Boolean chosen;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public AnsweredQuestion getAnsweredQuestion() {
        return answeredQuestion;
    }

    public void setAnsweredQuestion(AnsweredQuestion answeredQuestion) {
        this.answeredQuestion = answeredQuestion;
    }

    public QuestionOption getQuestionOption() {
        return questionOption;
    }

    public void setQuestionOption(QuestionOption questionOption) {
        this.questionOption = questionOption;
    }

    public Boolean getChosen() {
        return chosen;
    }

    public void setChosen(Boolean chosen) {
        this.chosen = chosen;
    }
}
