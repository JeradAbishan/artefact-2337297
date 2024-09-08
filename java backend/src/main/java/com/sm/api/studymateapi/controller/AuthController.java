package com.sm.api.studymateapi.controller;


import com.sm.api.studymateapi.dto.AuthResponse;
import com.sm.api.studymateapi.dto.LoginRequest;
import com.sm.api.studymateapi.dto.SignupRequest;
import com.sm.api.studymateapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public AuthResponse signupUser(@RequestBody  SignupRequest signupRequest) {
        return userService.signupUser(signupRequest);
    }

    @PostMapping("/login")
    public AuthResponse loginUser(@RequestBody  LoginRequest loginRequest) {
        return userService.loginUser(loginRequest);
    }
}
