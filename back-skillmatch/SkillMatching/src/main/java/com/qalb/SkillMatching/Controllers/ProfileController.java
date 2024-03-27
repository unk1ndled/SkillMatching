package com.qalb.SkillMatching.Controllers;

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
        return new ResponseEntity<>(userService.getProfileByUserId(id), HttpStatus.OK);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleUserAlreadyExistException(
            NoSuchElementException e
    ) {
        return new ResponseEntity<>("no such profile" , HttpStatusCode.valueOf(404));
    }

    @PostMapping
    public ResponseEntity<String> addKeyword(@RequestBody ProfileAndEmailRequest request) {
        profileService.addProfile(request.getProfile(), request.getEmail());
        return ResponseEntity.ok("ok");
    }




}
