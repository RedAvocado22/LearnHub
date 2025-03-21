package com.learnhub.enrollment;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentKey> {
    @Query(value = "select * from enrollment where MONTH(enrolled_at) = :month", nativeQuery = true)
    List<Enrollment> getCountOfStudentRegister(Integer month);
}
