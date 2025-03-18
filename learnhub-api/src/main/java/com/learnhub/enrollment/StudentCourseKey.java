package com.learnhub.enrollment;

import java.io.Serializable;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StudentCourseKey implements Serializable {
    private Long course;
    private Long student;
}
