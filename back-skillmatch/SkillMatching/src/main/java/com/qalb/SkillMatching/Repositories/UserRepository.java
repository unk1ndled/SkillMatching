package com.qalb.SkillMatching.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.qalb.SkillMatching.Models.User;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByEmail(String email);

}
