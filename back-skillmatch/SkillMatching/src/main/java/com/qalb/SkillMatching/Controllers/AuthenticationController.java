package com.qalb.SkillMatching.Controllers;

import com.qalb.SkillMatching.Exceptions.UserAlreadyExistException;
import com.qalb.SkillMatching.auth.AuthenticationRequest;
import com.qalb.SkillMatching.auth.AuthenticationResponse;
import com.qalb.SkillMatching.Services.AuthenticationService;
import com.qalb.SkillMatching.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    private final AuthenticationService service;

    @GetMapping("/hi")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("hi");
    }


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }

    @ExceptionHandler(UserAlreadyExistException.class)
    public ResponseEntity<String> handleUserAlreadyExistException(
            UserAlreadyExistException e
    ) {
        return new ResponseEntity<>("Email Already Registered" , HttpStatusCode.valueOf(400));
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
