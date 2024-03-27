package com.qalb.SkillMatching.Services;

import com.qalb.SkillMatching.Models.Profile;
import com.qalb.SkillMatching.Models.User;
import com.qalb.SkillMatching.Repositories.ProfileRepository;
import com.qalb.SkillMatching.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
                    profile.setRecognizedSkills(keywordService.extractKeywords(profile.getSkills()));
                    System.out.println(profile);
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
