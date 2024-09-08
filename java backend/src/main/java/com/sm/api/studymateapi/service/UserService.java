package com.sm.api.studymateapi.service;

import com.sm.api.studymateapi.dto.AuthResponse;
import com.sm.api.studymateapi.dto.LoginRequest;
import com.sm.api.studymateapi.dto.SignupRequest;
import org.springframework.stereotype.Service;


public interface UserService {
    AuthResponse signupUser(SignupRequest signupRequest);
    AuthResponse loginUser(LoginRequest loginRequest);
}
