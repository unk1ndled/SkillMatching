package com.qalb.SkillMatching.Repositories;

import com.qalb.SkillMatching.Models.Profile;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProfileRepository  extends MongoRepository<Profile, String> {
}
