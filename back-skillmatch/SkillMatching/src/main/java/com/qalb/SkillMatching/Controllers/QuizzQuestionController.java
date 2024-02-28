package com.qalb.SkillMatching.Controllers;

import com.qalb.SkillMatching.Models.QuizzQuestion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/quizz")

public class QuizzQuestionController {
    @Autowired
    private MongoTemplate mongoTemplate;

    @GetMapping("/question")
    public QuizzQuestion getQuestion(@RequestParam String about, @RequestParam int questionOrder ) {
        Query query = new Query();
        query.addCriteria(Criteria.where("about").is(about).and("question_order").is(questionOrder));
        return mongoTemplate.findOne(query, QuizzQuestion.class);
    }


}

