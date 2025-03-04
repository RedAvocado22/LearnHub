package com.learnhub.payment;

import com.learnhub.course.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    @Query(value = "select * from enrollment where MONTH(enrolled_at) = :month", nativeQuery = true)
    List<Enrollment> getCountOfStudentRegister(Integer month);
}
