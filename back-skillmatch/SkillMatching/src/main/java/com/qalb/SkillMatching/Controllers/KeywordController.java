package com.qalb.SkillMatching.Controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.qalb.SkillMatching.Models.Keyword;
import com.qalb.SkillMatching.Models.Offer;
import com.qalb.SkillMatching.Services.KeywordService;
import com.qalb.SkillMatching.Services.ScrapingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("api/v1/keywords")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class KeywordController {

    private final ScrapingService scrapingService;
    public final KeywordService keywordService;

    @GetMapping
    public List<Keyword> getKeywords(){
        return keywordService.getKeywords();
    }
    @GetMapping("/{id}")
    public ResponseEntity<Keyword> getKeywordById(@PathVariable String id) {
        Keyword keyword = keywordService.getKeywordById(id);
        if (keyword != null) {
            return new ResponseEntity<>(keyword, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addKeyword(@RequestBody Keyword keyword) {
        keywordService.addKeyword(keyword);
        return ResponseEntity.ok("ok");
    }


    @PostMapping("/analyse")
    public ResponseEntity<Set<String>> extractKeywords(@RequestBody String paragraph) {
        List<String> words = Arrays.asList(paragraph.split("[\\s,\\.,\\,]+")); // Split by whitespace, commas, or periods

        List<String> keywords = Arrays.asList(
                "python","javascript","java","c++","c#","ruby","swift","kotlin","php","html","css","typescript","sql","go","scala","rust","dart","objective-c","perl","r","shell scripting","vue.js","angularjs","react","node.js","asp.net","express.js","flask","spring boot","ruby on rails","laravel","django","jquery","bootstrap","ember.js","backbone.js","meteor.js","tensorflow","pytorch","keras","caffe","scikit-learn","numpy","pandas","matplotlib","seaborn","unity","unreal engine","kafka");

        // Filter words that are keywords
        Set<String> extractedKeywords = words.stream()
                .map(String::toLowerCase) // Convert each word to lowercase
                .filter(keywords::contains) // Filter lowercase words
                .collect(Collectors.toSet());
        return ResponseEntity.ok(extractedKeywords);
    }



}
