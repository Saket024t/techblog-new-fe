package com.example.techblog.payloads;

import lombok.Data;

@Data
public class JwtAuthResponse {
    private String token;
    private UserDto user; // Optional: Send user details along with token
}