package com.learnhub.course;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuizAttemptRepository quizAttemptRepository;

    @Autowired
    private QuestionOptionRepository questionOptionRepository;

    public Quiz getById(Long id) {
        return quizRepository.findById(id).orElseThrow();
    }

    public List<QuizAttempt> getQuizAttemptsOfQuiz(Long quizId) {
        return quizAttemptRepository.findByQuizId(quizId);
    }

    public List<QuestionOption> getQuestionOptionsIsCorrect(Long qid) {
        return quizRepository.findAllQuizWithOptionIsTrue(qid);
    }

    //@Transactional
    //public Long gradeQuiz(Long quizId, Long[] optionIds) {
    //    Quiz quiz = quizRepository.findById(quizId).orElseThrow();
    //    List<QuestionOption> selectedOptions = questionOptionRepository.findAllById(List.of(optionIds));
    //    Map<Long, List<QuestionOption>> selectedOptionsByQuestion = selectedOptions.stream()
    //            .collect(Collectors.groupingBy(option -> option.getQuestion().getId()));
    //    int correctQuestions = 0;
    //    for (Map.Entry<Long, List<QuestionOption>> entry : selectedOptionsByQuestion.entrySet()) {
    //        Long questionId = entry.getKey();
    //        List<QuestionOption> selectedForQuestion = entry.getValue();
    //        QuizQuestion question = quiz.getQuestions().stream().filter(q -> q.getId().equals(questionId)).findFirst().get();
    //        List<QuestionOption> allCorrectOptionsForQuestion = question.getOptions().stream().filter(QuestionOption::getCorrect).toList();
    //        Set<Long> correctOptionIds = allCorrectOptionsForQuestion.stream()
    //                .map(QuestionOption::getId)
    //                .collect(Collectors.toSet());
    //        Set<Long> selectedOptionIds = selectedForQuestion.stream()
    //                .map(QuestionOption::getId)
    //                .collect(Collectors.toSet());
    //        if (selectedOptionIds.equals(correctOptionIds)) {
    //            correctQuestions++;
    //        }
    //    }
    //    Double grade = (10.0 / quiz.getQuestions().size()) * correctQuestions;
    //    QuizAttempt t = quizAttemptRepository.save(new QuizAttempt(quiz, grade));
    //    return t.getId();
    //}

    public Double getAttemptGrade(Long id) {
        return quizAttemptRepository.findById(id).orElseThrow().getGrade();
    }
}
