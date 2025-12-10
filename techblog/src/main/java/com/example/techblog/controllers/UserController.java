package com.example.techblog.controllers;

import com.example.techblog.payloads.UserDto;
import com.example.techblog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    // PUT /api/users/update (Private - requires token)
    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, Principal principal) {
        String email = principal.getName();
        UserDto updatedUser = userService.updateUser(userDto, email);
        return ResponseEntity.ok(updatedUser);
    }

    // GET /api/users/{userId} (Public - view profile)
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId) {
        UserDto user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }
}