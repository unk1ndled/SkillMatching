package com.qalb.SkillMatching.Services;

import com.qalb.SkillMatching.Configurations.JwtService;
import com.qalb.SkillMatching.Exceptions.UserAlreadyExistException;
import com.qalb.SkillMatching.Models.Role;
import com.qalb.SkillMatching.Models.User;
import com.qalb.SkillMatching.Repositories.UserRepository;
import com.qalb.SkillMatching.auth.AuthenticationRequest;
import com.qalb.SkillMatching.auth.AuthenticationResponse;
import com.qalb.SkillMatching.auth.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    //TODO add function to remove user taking in consideration its profile

    public AuthenticationResponse register(RegisterRequest request) throws UserAlreadyExistException{
        if(repository.findByEmail(request.getEmail()).isPresent()){
            throw new UserAlreadyExistException("Email Already Registered");
        }
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();

        Map<String, Object> extraClaims = new HashMap<>();

        extraClaims.put("id",user.getId());
        extraClaims.put("firstname",user.getFirstname());
        extraClaims.put("lastname",user.getLastname());
        extraClaims.put("role",user.getRole().toString());

        var jwtToken = jwtService.generateToken(extraClaims,user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
