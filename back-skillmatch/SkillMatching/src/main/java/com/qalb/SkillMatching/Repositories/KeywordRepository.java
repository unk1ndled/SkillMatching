package com.qalb.SkillMatching.Repositories;

import com.qalb.SkillMatching.Models.Keyword;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface KeywordRepository extends MongoRepository<Keyword,String> {
}
