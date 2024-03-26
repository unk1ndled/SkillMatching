package com.qalb.SkillMatching.Services;

import com.qalb.SkillMatching.Models.Profile;
import com.qalb.SkillMatching.Models.User;
import com.qalb.SkillMatching.Repositories.ProfileRepository;
import com.qalb.SkillMatching.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;



@Service
@RequiredArgsConstructor
public class ProfileService {
    private ProfileRepository profileRepository;
    private UserRepository userRepository;
    private KeywordService keywordService;

    public void deleteProfile(String id){
        profileRepository.deleteById(id);
    }




    public void addProfile(Profile profile, String email) {
        if (profile == null || email == null) {
            throw new IllegalArgumentException("Profile or email cannot be null");
        }

        userRepository.findByEmail(email)
                .map(user -> {
                    if (user.getProfileId() != null) {
                        deleteProfile(user.getProfileId());
                    }
                    profile.setRecognizedSkills(keywordService.extractKeywords(profile.getSkills()));
                    return profileRepository.save(profile);
                })
                .ifPresent(savedProfile -> {
                    User user = userRepository.findByEmail(email)
                            .orElseThrow(() -> new IllegalArgumentException("User not found for email: " + email));
                    user.setProfileId(savedProfile.getId());
                    userRepository.save(user);
                });
    }

}
