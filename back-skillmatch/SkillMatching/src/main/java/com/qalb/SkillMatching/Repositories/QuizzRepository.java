package com.qalb.SkillMatching.Repositories;

import com.qalb.SkillMatching.Models.QuizzQuestion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuizzRepository extends MongoRepository<QuizzQuestion, String> {
    //QuizzQuestion findByAboutAndAdvancedAndQuestionOrder(String about, boolean advanced, int questionOrder);
}
