package com.qalb.SkillMatching.Controllers;


import com.qalb.SkillMatching.Models.Keyword;
import com.qalb.SkillMatching.Models.QuizzQuestion;
import com.qalb.SkillMatching.Services.KeywordService;
import com.qalb.SkillMatching.Services.ScrapingService;
import com.qalb.SkillMatching.Services.UtilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

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

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteById(@PathVariable String id) {
         keywordService.deleteById(id);
        return ResponseEntity.ok("ok");
    }

    @PostMapping
    public ResponseEntity<String> addKeyword(@RequestBody Keyword keyword) {
        keywordService.addKeyword(keyword);
        return ResponseEntity.ok("ok");
    }

//    @PostMapping("/analyse")
//    public ResponseEntity<Map<String,Integer>> extractKeywords(@RequestBody String paragraph) {
//        return ResponseEntity.ok(keywordService.extractKeywordsMap(paragraph));
//    }
    @GetMapping("/get-id")
    public String getIdByName(@RequestParam String name) {
        return keywordService.getKeywordId(name);
    }

}
