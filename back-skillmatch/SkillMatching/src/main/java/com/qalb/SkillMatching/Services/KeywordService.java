package com.qalb.SkillMatching.Services;

import com.qalb.SkillMatching.Models.Keyword;
import com.qalb.SkillMatching.Models.Offer;
import com.qalb.SkillMatching.Repositories.KeywordRepository;
import com.qalb.SkillMatching.Repositories.OfferRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {
    @Autowired
    private KeywordRepository repository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Keyword> getKeywords(){
        return repository.findAll();
    }

    public void addKeyword(Keyword keyword) {
        // Check if the keyword already exists in the database
        boolean exists = repository.existsByName(keyword.getName());

        if (!exists) {
            repository.save(keyword);
        }
    }

    public Keyword getKeywordById(String id) {
        return repository.findById(id).orElse(null);
    }
}
