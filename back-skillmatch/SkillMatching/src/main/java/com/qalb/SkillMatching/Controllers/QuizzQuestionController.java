package com.qalb.SkillMatching.Controllers;

import com.qalb.SkillMatching.Models.QuizzQuestion;
import com.qalb.SkillMatching.Services.QuizzService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/quizz")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class QuizzQuestionController {

//    @Autowired
//    private MongoTemplate mongoTemplate;

    @Autowired
    private QuizzService quizzService;


    /* @GetMapping("/question")
    public ResponseEntity<QuizzQuestion> getQuestion(@RequestParam String about, @RequestParam boolean advanced  , @RequestParam int questionOrder ) {
        QuizzQuestion question = quizzService.getQuestion(about, advanced, questionOrder);
        if (question != null) {
            return ResponseEntity.ok(question);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
*/



    @GetMapping("/question")
    public ResponseEntity<QuizzQuestion> getQuestions(
            @RequestParam String about,
            @RequestParam boolean advanced,
            @RequestParam int questionOrder) {
        QuizzQuestion question = quizzService.getQuestion(about, advanced, questionOrder);
        if (question != null) {
            return new ResponseEntity<>(question, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/question/{id}")
    public ResponseEntity<QuizzQuestion> getQuestionById(@PathVariable String id) {
        QuizzQuestion question = quizzService.getQuestionById(id);
        if (question != null) {
            return ResponseEntity.ok(question);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @GetMapping("/biggest-question-order")
    public ResponseEntity<Integer> getBiggestQuestionOrder(@RequestParam String about,
                                                           @RequestParam boolean advanced) {
        int maxQuestionOrder = quizzService.getBiggestQuestionOrder(about, advanced);
            return ResponseEntity.ok(maxQuestionOrder);


    }

    @PostMapping("/question")
    public ResponseEntity<QuizzQuestion> addQuestion(@RequestBody QuizzQuestion quizzQuestion) {
//        String question = (String) requestBody.get("question");
//        Map<String, Boolean> answers = (Map<String, Boolean>) requestBody.get("answers");
//        boolean advanced = (boolean) requestBody.get("advanced");
//        String about = (String) requestBody.get("about");
        QuizzQuestion newQuestion = quizzService.addQuizzQuestion(quizzQuestion);
        return ResponseEntity.status(HttpStatus.CREATED).body(newQuestion);
    }
}



