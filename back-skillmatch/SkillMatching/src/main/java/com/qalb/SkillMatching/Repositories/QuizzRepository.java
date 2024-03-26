package com.qalb.SkillMatching.Repositories;

import com.qalb.SkillMatching.Models.QuizzQuestion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuizzRepository extends MongoRepository<QuizzQuestion, String> {


    List<QuizzQuestion> findByAboutAndAdvanced(String about, boolean advanced);



    @Query("{ 'about' : ?0, 'advanced' : ?1, 'question_order' : ?2 }")
    QuizzQuestion findByAboutAndAdvancedAndQuestionOrder(@Param("about") String about,
                                                         @Param("advanced") boolean advanced,
                                                         @Param("questionOrder") int questionOrder);
}
