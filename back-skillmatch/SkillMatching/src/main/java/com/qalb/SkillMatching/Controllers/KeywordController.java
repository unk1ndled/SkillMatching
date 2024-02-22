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
        List<String> words = Arrays.asList(paragraph.split("\\s+"));
        List<String> keywords = Arrays.asList("java", "node", "js", "react", "web");

        // Filter words that are keywords
        Set<String> extractedKeywords = words.stream()
                .filter(keywords::contains)
                .collect(Collectors.toSet());


        return ResponseEntity.ok(extractedKeywords);
    }



}
