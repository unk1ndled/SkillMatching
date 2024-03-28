package com.qalb.SkillMatching.Services;

import com.qalb.SkillMatching.Models.Offer;
import com.qalb.SkillMatching.Repositories.OfferRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository repository;
    private final  KeywordService keywordService;

    public List<Offer> getOffers(){
        return repository.findAll();
    }

    public Offer getOfferById(String id){
        Optional<Offer> offer = repository.findById(id);
        return offer.orElse(null);
    }
    public void reAnalyseOffer(String id){
        Offer offer = getOfferById(id);
        Map<String,String> words = keywordService.extractKeywordsIdName(offer.getProfile());
        Map<String,String> words2 = keywordService.extractKeywordsIdName(offer.getPost());

        words.putAll(words2);
        offer.setRecognizedSkills(words);
        repository.save(offer);
    }

    public void saveOffer(Map<String, String> offer){


        Offer offerPojo = Offer.builder()
                .post(offer.get("post"))
                .profile(offer.get("profile"))
                .title(offer.get("title"))
                .build();

        Map<String,String> words = keywordService.extractKeywordsIdName(offerPojo.getProfile());
        words.putAll(keywordService.extractKeywordsIdName(offerPojo.getPost()));
        offerPojo.setRecognizedSkills(words);

        repository.save(offerPojo);
    }




}
