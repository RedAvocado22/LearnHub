package com.learnhub.course.chapter.lesson;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "lesson_document")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LessonDocument {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_size")
    private Long fileSize;

    @Column(name = "download_link")
    private String downloadLink;

    @ManyToOne
    @JoinColumn(name = "content_id", referencedColumnName = "id")
    private LessonContent content;
}
