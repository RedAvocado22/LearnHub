package com.learnhub.course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface QuestionOptionRepository extends JpaRepository<QuestionOption, Long> {
    @Query(value = "select * from quiz_question que join  question_option op on op.question_id = que.id where que.id= ?1 and op.correct =1 ;",nativeQuery = true)
    List<QuestionOption> findAllQuizWithOptionIsTrue(Long questionId);
}
