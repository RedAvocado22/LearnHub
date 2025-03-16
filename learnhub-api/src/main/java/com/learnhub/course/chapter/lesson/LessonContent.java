package com.learnhub.course.chapter.lesson;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "lesson_content")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonContent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Lesson lesson;

    @OneToMany(mappedBy = "content", cascade = CascadeType.ALL, orphanRemoval = true)
    @Nullable
    private List<LessonDocument> documents;

    @Column(name = "video")
    @Nullable
    private String video;

    //quiz vào đây sau
    @Column(name = "quiz")
    @Nullable
    private String quiz;
}
