package com.learnhub.enrollment;

import java.io.Serializable;
import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
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
@Table(name = "finished_material")
@IdClass(FinishedMaterialKey.class)
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FinishedMaterial {
    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumns({
        @JoinColumn(name = "course_id", referencedColumnName = "course_id", nullable = false),
        @JoinColumn(name = "student_id", referencedColumnName = "student_id", nullable = false)
    })
    private Enrollment enrollment;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id", nullable = false)
    private ChapterMaterial material;

    @Column(name = "finished_at")
    private final LocalDateTime finishedAt = LocalDateTime.now();
}

@Data
@NoArgsConstructor
class FinishedMaterialKey implements Serializable {
    private Enrollment enrollment;
    private Long material;
}
