package com.qalb.SkillMatching.Services;


import com.qalb.SkillMatching.Models.QuizzQuestion;
import com.qalb.SkillMatching.Repositories.QuizzRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor

public class QuizzService {



    @Autowired
    private  QuizzRepository quizzRepository;



    /*public QuizzQuestion getQuestion(String about, boolean advanced, int questionOrder) {
        Query query = new Query();
        query.addCriteria(Criteria.where("about").is(about)
                .and("question_order").is(questionOrder)
                .and("advanced").is(advanced));
        return mongoTemplate.findOne(query, QuizzQuestion.class);
    }
*/
    public QuizzQuestion getQuestion(String about, boolean advanced, int questionOrder) {
        return quizzRepository.findByAboutAndAdvancedAndQuestionOrder(about, advanced, questionOrder);
    }


    public QuizzQuestion getQuestionById(String id) {
            return quizzRepository.findById(id).orElse(null);
        }

    public QuizzQuestion addQuestion(QuizzQuestion quizzQuestion) {
        return quizzRepository.save(quizzQuestion);
    }

    public int getBiggestQuestionOrder(String about, boolean advanced) {
        List<QuizzQuestion> questions = quizzRepository.findByAboutAndAdvanced(about, advanced);
        int maxQuestionOrder = 0;

        for (QuizzQuestion question : questions) {
            if (question.getQuestionOrder() > maxQuestionOrder) {
                maxQuestionOrder = question.getQuestionOrder();
            }
        }
        return maxQuestionOrder;
    }
//    public QuizzQuestion addQuizzQuestion(String question, Map<String, Boolean> answers, boolean advanced, String about) {
//        int questionOrder = getBiggestQuestionOrder(about, advanced) + 1;
//        QuizzQuestion newQuestion = QuizzQuestion.builder()
//                .question(question)
//                .answers(answers)
//                .advanced(advanced)
//                .about(about)
//                .question_order(questionOrder)
//                .build();
//        return quizzRepository.save(newQuestion);
//    }

    public QuizzQuestion addQuizzQuestion (QuizzQuestion quizzQuestion){
        int questionOrder = getBiggestQuestionOrder(quizzQuestion.getAbout(), quizzQuestion.isAdvanced()) + 1;
        quizzQuestion.setQuestion_order(questionOrder);
        return quizzRepository.save(quizzQuestion);
    }
}
