package com.learnhub.enrollment;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinishedMaterialRepository extends JpaRepository<FinishedMaterial, FinishedMaterialKey> {
    List<FinishedMaterial> findByEnrollment(Enrollment enrollment);
}
