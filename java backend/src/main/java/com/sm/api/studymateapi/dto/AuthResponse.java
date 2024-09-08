package com.sm.api.studymateapi.dto;

import com.sm.api.studymateapi.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String fullName;
    private String email;
    private Role role;
    private String bio;
    private String message;
}
