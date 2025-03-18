package com.learnhub.enrollment;

import java.io.Serializable;
import java.util.Set;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import com.learnhub.course.chapter.quiz.Option;
import com.learnhub.course.chapter.quiz.Question;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "attempted_question")
@IdClass(AnsweredQuestionKey.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnsweredQuestion {
    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "attempt_id", nullable = false)
    private QuizAttempt attempt;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(name = "correct", nullable = false)
    private Boolean correct;

    @ManyToMany
    @JoinTable(
        name = "answered_option",
        joinColumns = {
            @JoinColumn(name = "attempt_id", referencedColumnName = "attempt_id"),
            @JoinColumn(name = "question_id", referencedColumnName = "question_id")
        },
        inverseJoinColumns = @JoinColumn(name = "option_id", referencedColumnName = "id")
    )
    private Set<Option> chosenOptions;
}

@Data
@NoArgsConstructor
class AnsweredQuestionKey implements Serializable {
    private Long attempt;
    private Long question;
}
