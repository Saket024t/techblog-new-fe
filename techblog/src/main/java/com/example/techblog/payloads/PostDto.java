package com.example.techblog.payloads;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private String code;
    private String category;
    private LocalDateTime pDate;
    
    // Instead of the full User entity, we nest the UserDto here
    private UserDto user; 
}