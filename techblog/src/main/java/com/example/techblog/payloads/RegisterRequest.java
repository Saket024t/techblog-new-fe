package com.example.techblog.payloads;

import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password; // Raw password from user
    private String gender;
    private String about;
}