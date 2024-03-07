package com.qalb.SkillMatching.Repositories;

import com.qalb.SkillMatching.Models.Offer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface OfferRepository extends MongoRepository<Offer, String> {
}
