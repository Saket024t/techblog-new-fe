package com.example.techblog.payloads;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String gender;
    private String about;
    private LocalDateTime rdate;
}