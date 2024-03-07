package com.qalb.SkillMatching.Services;

import com.qalb.SkillMatching.Models.Keyword;
import com.qalb.SkillMatching.Models.Offer;
import com.qalb.SkillMatching.Repositories.KeywordRepository;
import com.qalb.SkillMatching.Repositories.OfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class KeywordService {
    @Autowired
    private KeywordRepository repository;

    public List<Keyword> getKeywords(){
        return repository.findAll();
    }


    public void addKeyword(Keyword keyword) {
        repository.save(keyword);
    }

    public Keyword getKeywordById(String id) {
        return repository.findById(id).orElse(null);
    }
}
