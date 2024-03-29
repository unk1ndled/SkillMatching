package com.qalb.SkillMatching.Models;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Map;

@Document(collection = "quizz")
@Data
@Builder
@Setter
@Getter
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

    public void setQuestionOrder(int question_order) {
        this.question_order=question_order;
    }
    }



