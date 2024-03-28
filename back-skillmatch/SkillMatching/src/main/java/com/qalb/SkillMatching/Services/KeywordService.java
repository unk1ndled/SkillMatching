package com.qalb.SkillMatching.Services;

import com.qalb.SkillMatching.Models.Keyword;
import com.qalb.SkillMatching.Repositories.KeywordRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class KeywordService {

    private final KeywordRepository repository;
    private final KeywordCacheService cacheService;
    public final UtilityService utilityService;

    public List<Keyword> getKeywords(){
        return repository.findAll();
    }

    public void addKeyword(Keyword keyword) {
        // Check if the keyword already exists in the database
        boolean exists = repository.existsByName(keyword.getName());

        if (!exists) {
            repository.save(keyword);
            forceRefreshCache();
        }

    }

    public Map<String, String> getKeywordMap() {
        return cacheService.getKeywordMap();
    }



    public Map<String, String> extractKeywordsIdName(String paragraph){
        List<String> words = utilityService.getWords(paragraph);
        Map<String, String> keywordMap = getKeywordMap();
        Map<String, String> matchingKeywords = new HashMap<>();

        for (String word : words) {
            String id = keywordMap.get(word);
            if (id != null) {
                matchingKeywords.put(word,id);
            }
        }
        return matchingKeywords;
    }


    public Set<String> extractKeywordsSet(String paragraph){
        List<String> words = utilityService.getWords(paragraph);
        Map<String, String> keywordMap = getKeywordMap();
        Set<String> matchingKeywords = new HashSet<>();

        for (String word : words) {
            String id = keywordMap.get(word);
            if (id != null) {
                matchingKeywords.add(id);
            }
        }
            return matchingKeywords;
    }

    public String getKeywordId(String name){
        Keyword keyword = repository.findByName(name);
        if(keyword != null){
            return keyword.getId();
        }
        return null;
    }


    public Map<String, Integer> extractKeywordsInitiate(String paragraph) {

        List<String> words = utilityService.getWords(paragraph);
        Map<String, String> keywordMap = getKeywordMap();
        Map<String, Integer> matchingKeywords = new HashMap<>();

        for (String word : words) {
            String id = keywordMap.get(word);
            if (id != null) {
                matchingKeywords.put(id,0);
            }
        }
        return matchingKeywords;
    }

    public Map<String, Integer> extractKeywords(String paragraph) {
        List<String> words = utilityService.getWords(paragraph);
        Map<String, String> keywordMap = getKeywordMap();
        Map<String, Integer> matchingKeywords = new HashMap<>();

        for (String word : words) {
            String id = keywordMap.get(word);
            if (id != null) {
                matchingKeywords.put(id,0);
            }
        }
        return matchingKeywords;
    }

    public Keyword getKeywordById(String id) {
        return repository.findById(id).orElse(null);
    }


    // Caching
    // Method to force cache refresh
    public void forceRefreshCache() {
        cacheService.clearKeywordCache();
    }

    public void deleteById(String id) {
        repository.deleteById(id);
    }



    // added inner class because caching the keywords requires a different class than the keyword service

    @Service
    @RequiredArgsConstructor
    public static class KeywordCacheService {
        private final KeywordRepository repository;

        @Cacheable(value = "keywordMap")
        public Map<String, String> getKeywordMap() {
            List<Keyword> knownWords = repository.findAll();
            return knownWords.stream()
                    .collect(Collectors.toMap(Keyword::getName, Keyword::getId));
        }

        @CacheEvict(value = "keywordMap", allEntries = true)
        public void clearKeywordCache() {
            // This method will clear the cache when needed
        }
    }
}
