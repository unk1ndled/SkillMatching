package com.qalb.SkillMatching.Controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/keywords")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class KeywordController {

    @PostMapping("/analyse")
    public ResponseEntity<Set<String>> extractKeywords(@RequestBody String paragraph) {
        List<String> words = Arrays.asList(paragraph.split("[\\s,\\.,\\,]+")); // Split by whitespace, commas, or periods

        List<String> keywords = Arrays.asList(
                "python","javascript","java","c++","c#","ruby","swift","kotlin","php","html","css","typescript","sql","go","scala","rust","dart","objective-c","perl","r","shell scripting","vue.js","angularjs","react","node.js","asp.net","express.js","flask","spring boot","ruby on rails","laravel","django","jquery","bootstrap","ember.js","backbone.js","meteor.js","tensorflow","pytorch","keras","caffe","scikit-learn","numpy","pandas","matplotlib","seaborn","unity","unreal engine");

        // Filter words that are keywords
        Set<String> extractedKeywords = words.stream()
                .map(String::toLowerCase) // Convert each word to lowercase
                .filter(keywords::contains) // Filter lowercase words
                .collect(Collectors.toSet());

        return ResponseEntity.ok(extractedKeywords);
    }



}
