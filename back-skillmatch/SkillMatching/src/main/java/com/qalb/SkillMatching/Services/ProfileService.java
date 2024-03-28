package com.qalb.SkillMatching.Services;

import com.qalb.SkillMatching.Models.Profile;
import com.qalb.SkillMatching.Models.User;
import com.qalb.SkillMatching.Repositories.ProfileRepository;
import com.qalb.SkillMatching.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final UserRepository userRepository;
    private final  KeywordService keywordService;


    public void deleteProfile(String id){
        profileRepository.deleteById(id);
    }

    public Optional<Profile> getProfile(String id) { return profileRepository.findById(id);}

    public void addProfile(Profile profile, String email) {
        if (profile == null || email == null) {
            throw new IllegalArgumentException("Profile or email cannot be null just now");
        }

        userRepository.findByEmail(email)
                .map(user -> {
                    if (user.getProfileId() != null) {
                        deleteProfile(user.getProfileId());
                    }
                    profile.setRecognizedSkills(keywordService.extractKeywordsInitiate(profile.getSkills()));
                    return profileRepository.save(profile);
                })
                .ifPresent(savedProfile -> {
                    User user = userRepository.findByEmail(email)
                            .orElseThrow(() -> new IllegalArgumentException("User not found for email: " + email));
                    user.setProfileId(savedProfile.getId());
                    userRepository.save(user);
                });
    }

    public void levelUpSkill(Profile profile, String skill ,int level){
        Map<String, Integer> recognizedSkills = profile.getRecognizedSkills();
        recognizedSkills.put(skill, level);
        profile.setRecognizedSkills(recognizedSkills);
        profileRepository.save(profile);
    }

    public void removeSkill(Profile profile, String skill ){
        Map<String, Integer> recognizedSkills = profile.getRecognizedSkills();
        recognizedSkills.remove(skill);
        profile.setRecognizedSkills(recognizedSkills);
        profileRepository.save(profile);
    }

    public void levelUpSkill(String id, String skill ,int level) {
        Profile profile = getProfile(id)
                .orElseThrow(() -> new NoSuchElementException("Profile not found with ID: " + id));
        levelUpSkill(profile,skill,level);
    }

    public void removeSkill(String id, String skill ) {
        Profile profile = getProfile(id)
                .orElseThrow(() -> new NoSuchElementException("Profile not found with ID: " + id));
        removeSkill(profile,skill);
    }


}
