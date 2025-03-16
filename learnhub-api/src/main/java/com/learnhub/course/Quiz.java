package com.learnhub.course;


import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "quiz")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "pass_grade")
    private Double passGrade;

    @Column(name = "time")
    private Integer time;

    @OneToMany(fetch = FetchType.EAGER, mappedBy = "quiz")
    private Set<QuizQuestion> questions = new HashSet<>();
}
