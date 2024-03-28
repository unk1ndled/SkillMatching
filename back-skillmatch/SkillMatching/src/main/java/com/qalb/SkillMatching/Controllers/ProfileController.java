package com.qalb.SkillMatching.Controllers;

import com.qalb.SkillMatching.Exceptions.NoProfileException;
import com.qalb.SkillMatching.Exceptions.UserAlreadyExistException;
import com.qalb.SkillMatching.Models.*;
import com.qalb.SkillMatching.Services.ProfileService;
import com.qalb.SkillMatching.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/profiles")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class ProfileController {
    private final ProfileService profileService;
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileByUserId(@PathVariable String id) {
        Profile profile = userService.getProfileByUserId(id);
        // Check if profile is null (not found)
        if (profile == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @ExceptionHandler(NoProfileException.class)
    public ResponseEntity<String> handleNoProfile(
            NoProfileException e
    ) {
        return new ResponseEntity<>("You dont Have a Profile" , HttpStatusCode.valueOf(404));
    }

    @PostMapping("/{userid}/keywords/{skillId}")
    public ResponseEntity<String> levelUpSkill(
            @PathVariable String userid ,
            @PathVariable String skillId  ,
            @RequestParam(name = "advanced", defaultValue = "false") boolean advanced) {

        userService.levelUpProfileSkill(userid,skillId,advanced);
        return ResponseEntity.ok("ok");
    }

    @DeleteMapping("/{userId}/keywords/{skillId}")
    public ResponseEntity<String> deleteSkill(
            @PathVariable String userId ,
            @PathVariable String skillId) {
        userService.removeProfileSkill(userId,skillId);
        return ResponseEntity.ok("ok");
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleUserAlreadyExistException(
            NoSuchElementException e
    ) {
        return new ResponseEntity<>("no such profile" , HttpStatusCode.valueOf(404));
    }

    @PostMapping
    public ResponseEntity<String> addProfile(@RequestBody ProfileAndEmailRequest request) {
        profileService.addProfile(request.getProfile(), request.getEmail());
        return ResponseEntity.ok("ok");
    }


}
