package com.learnhub.enrollment;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
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
import lombok.Builder.Default;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "attempted_question")
@IdClass(AnsweredQuestionKey.class)
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnsweredQuestion {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
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
    @Default
    private List<Option> chosenOptions = new ArrayList<>();
}

@Data
@NoArgsConstructor
class AnsweredQuestionKey implements Serializable {
    private Long attempt;
    private Long question;
}
