package com.qalb.SkillMatching.Services;


import com.qalb.SkillMatching.Models.QuizzQuestion;
import com.qalb.SkillMatching.Repositories.QuizzRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuizzService {

    private final MongoTemplate mongoTemplate;
    private  final QuizzRepository quizzRepository;



    public QuizzQuestion getQuestion(String about, boolean advanced, int questionOrder) {
        Query query = new Query();
        query.addCriteria(Criteria.where("about").is(about)
                .and("question_order").is(questionOrder)
                .and("advanced").is(advanced));
        return mongoTemplate.findOne(query, QuizzQuestion.class);
    }

    /*public QuizzQuestion getQuestion(String about, boolean advanced, int questionOrder) {
        return quizzRepository.findByAboutAndAdvancedAndQuestionOrder(about, advanced, questionOrder);
    }
*/

        public QuizzQuestion getQuestionById(String id) {
            return quizzRepository.findById(id).orElse(null);
        }

    public QuizzQuestion addQuestion(QuizzQuestion quizzQuestion) {
        return quizzRepository.save(quizzQuestion);
    }
}
