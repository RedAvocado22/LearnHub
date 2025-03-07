package com.learnhub.course;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query(value = "select * from quiz qui join quiz_question que on qui.id = que.quiz_id join  question_option op on op.question_id = qui.id where que.id= ?1 and op.correct =1 ;",nativeQuery = true)
    List<QuestionOption> findAllQuizWithOptionIsTrue(Long qid);

    @Query(value = "select * from quiz qui join quiz_question que on qui.id = que.quiz_id  where qui.id= ?1 ;",nativeQuery = true)
    List<QuizQuestion> findAllQuizQuestion(Long qid);

}
