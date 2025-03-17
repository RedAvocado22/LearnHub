package com.learnhub.course;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/students/me")
public class QuizController {
    public static record QuizResponse(
            String title,
            String description,
            Set<QuizQuestionResponse> questions,
            List<QuizAttemptResponse> history) {
        public static record QuizQuestionResponse(Long id, String text, List<QuestionOptionResponse> options) {
            public static record QuestionOptionResponse(Long id, String text) {}
        }
        public static record QuizAttemptResponse(Long id, LocalDateTime attemptedAt, Double grade) {}
    }

    @Autowired
    private QuizService quizService;

    //@GetMapping("/quizes/{qid}")
    //public ResponseEntity<QuizResponse> getQuiz(@PathVariable("qid") Long qid) {
    //    Quiz quiz = quizService.getById(qid);
    //    List<QuizResponse.QuizAttemptResponse> history = quizService.getQuizAttemptsOfQuiz(qid).stream()
    //            .map(quizAttempt -> new QuizResponse.QuizAttemptResponse(
    //                    quizAttempt.getId(),
    //                    quizAttempt.getSubmittedAt(),
    //                    quizAttempt.getGrade())).toList();
    //    Set<QuizResponse.QuizQuestionResponse> questions = quiz.getQuestions().stream()
    //            .map(question -> new QuizResponse.QuizQuestionResponse(
    //                    question.getId(),
    //                    question.getText(),
    //                    question.getOptions().stream()
    //                            .map(option -> new QuizResponse.QuizQuestionResponse.QuestionOptionResponse(
    //                                    option.getId(),
    //                                    option.getText())).toList())).collect(Collectors.toSet());
    //    QuizResponse quizResponse = new QuizResponse(quiz.getTitle(), quiz.getDescription(), questions, history);
    //    return ResponseEntity.ok(quizResponse);
    //}

    //@PostMapping("/quizes/{quizId}/grade")
    //public ResponseEntity<Long> gradeQuiz(@PathVariable("quizId") Long quizId, @RequestBody Long[] optionIds) {
    //    return ResponseEntity.ok(quizService.gradeQuiz(quizId, optionIds));
    //}
    //
    //@GetMapping("/quizes/attempts/{id}")
    //public ResponseEntity<Double> getQuizAttempt(@PathVariable("id") Long id) {
    //    return ResponseEntity.ok(quizService.getAttemptGrade(id));
    //}

}
