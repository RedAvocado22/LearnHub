package com.learnhub.user.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    @Query(value = "select * from student_profile sp join account a on sp.id = a.id where email like ?1 ", nativeQuery = true)
    public Student findByEmail(String email);


}
