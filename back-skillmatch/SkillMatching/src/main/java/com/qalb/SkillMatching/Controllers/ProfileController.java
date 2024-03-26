package com.qalb.SkillMatching.Controllers;

import com.qalb.SkillMatching.Models.Keyword;
import com.qalb.SkillMatching.Models.Profile;
import com.qalb.SkillMatching.Services.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/profiles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class ProfileController {
    private final ProfileService profileService;

    @PostMapping
    public ResponseEntity<String> addKeyword(@RequestBody Profile profile,@RequestBody String email) {
        profileService.addProfile(profile,email);
        return ResponseEntity.ok("ok");
    }




}
