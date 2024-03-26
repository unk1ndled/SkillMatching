package com.qalb.SkillMatching.Models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "quizz")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class QuizzQuestion {
    @Id
    private String id;

    private String question;
    private int question_order;
    private String about;
    private Map<String, Boolean> answers;
    private boolean advanced ;


    public int getQuestionOrder() {
        return this.question_order;
    }

    }



