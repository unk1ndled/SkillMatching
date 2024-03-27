package com.qalb.SkillMatching.Services;

import com.qalb.SkillMatching.Models.Profile;
import com.qalb.SkillMatching.Models.User;
import com.qalb.SkillMatching.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ProfileService profileService;


    public Optional<User> getUser(String id){
        return userRepository.findById(id);
    }
    public void deleteUser(String id) {
        Optional<User> user = userRepository.findById(id);
        user.ifPresent(u -> {
            String profileId = u.getProfileId();
            if (profileId != null) {
                profileService.deleteProfile(profileId);
            }
        });
        userRepository.deleteById(id);
    }

    public Profile getProfileByUserId(String id) {
        User user = getUser(id)
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + id));

        String profileId = user.getProfileId();
        if (profileId == null) {
            throw new IllegalStateException("User's profile ID is null");
        }

        return profileService.getProfile(profileId)
                .orElseThrow(() -> new NoSuchElementException("Profile not found with ID: " + profileId));
    }

}
