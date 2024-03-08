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

@Service
@RequiredArgsConstructor
public class OfferService {
    @Autowired
    private OfferRepository repository;

    public List<Offer> getOffers(){
        return repository.findAll();
    }

    public Offer getOfferById(String id){
        Optional<Offer> offer = repository.findById(id);
        return offer.orElse(null);
    }
    public void saveOffer(Map<String, String> offer){
        Offer offerPojo = Offer.builder()
                .post(offer.get("post"))
                .profile(offer.get("profile"))
                .title(offer.get("title"))
                .build();
        repository.save(offerPojo);
    }


}
