package com.learnhub.enrollment;

import java.util.List;
import com.learnhub.enrollment.dto.EnrollmentStatResponse;
import com.learnhub.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentKey> {
    @Query("select new com.learnhub.enrollment.dto.EnrollmentStatResponse(year(e.enrolledAt), month(e.enrolledAt), count(e)) from Enrollment e group by year(e.enrolledAt), month(e.enrolledAt) order by year(e.enrolledAt), month(e.enrolledAt)")
    List<EnrollmentStatResponse> getStats();

    @Query("select e.student.user from Enrollment e where e.course.id = :id")
    List<User> findUsersEnrolledInCourse(@Param("id") Long courseId);
}
