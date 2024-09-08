package com.sm.api.studymateapi.service.impl;

import com.sm.api.studymateapi.dto.AuthResponse;
import com.sm.api.studymateapi.dto.LoginRequest;
import com.sm.api.studymateapi.dto.SignupRequest;
import com.sm.api.studymateapi.exception.APIServiceException;
import com.sm.api.studymateapi.model.Role;
import com.sm.api.studymateapi.model.User;
import com.sm.api.studymateapi.repo.UserRepo;
import com.sm.api.studymateapi.service.Jwt.JwtService;
import com.sm.api.studymateapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtService jwtService;


    public AuthResponse signupUser(SignupRequest signupRequest) {
        var user = User.builder()
                .fullName(signupRequest.getFullName())
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .bio(signupRequest.getBio())
                .role(Role.STUDENT).build();

        // Check if email already exists
        if (userRepo.findByEmail(signupRequest.getEmail()).isPresent()) {
            throw new APIServiceException("Email already exists", HttpStatus.CONFLICT);
        }
        userRepo.save(user);

        var jwt = jwtService.generateToken(user);

        return new AuthResponse(jwt, user.getFullName(), user.getEmail(),user.getRole(),user.getBio(), "Signup successful");
    }


    public AuthResponse loginUser(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(), loginRequest.getPassword()
                ));
        var user = userRepo.findByEmail(loginRequest.getUsername()).orElseThrow();
        var jwt = jwtService.generateToken(user);

        return new AuthResponse(jwt, user.getFullName(), user.getEmail(), user.getRole(), user.getBio(), "Login successful");


    }
}
