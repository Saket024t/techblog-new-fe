package com.example.techblog.payloads;

import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String password;
}