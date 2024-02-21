package com.qalb.SkillMatching.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.qalb.SkillMatching.Models.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);

}
