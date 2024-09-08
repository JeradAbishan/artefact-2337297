package com.sm.api.studymateapi.dto;

import lombok.Getter;
import lombok.Setter;


import java.util.UUID;

@Getter
@Setter

public class SignupRequest {
    private String fullName;
    private String email;
    private String password;
    private String bio;
    private String role;
}
