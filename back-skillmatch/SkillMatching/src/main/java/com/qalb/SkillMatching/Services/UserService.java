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

    public String getProfileId(String userId) {
        User user = getUser(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userId));

        String profileId = user.getProfileId();
        if (profileId == null) {
            throw new IllegalStateException("User's profile ID is null");
        }

        return profileId;
    }

    public void levelUpProfileSkill(String userId, String skillId ,boolean advanced){
        String profile = getProfileId(userId);
        int level = (advanced) ? 2:1;
        profileService.levelUpSkill(profile,skillId,level);
    }

    public void removeProfileSkill(String userId,String skillId){
        String profile = getProfileId(userId);
        profileService.removeSkill(profile,skillId);
    }

}
