package com.example.techblog.controllers;

import com.example.techblog.entities.User;
import com.example.techblog.payloads.JwtAuthResponse;
import com.example.techblog.payloads.LoginRequest;
import com.example.techblog.payloads.RegisterRequest;
import com.example.techblog.payloads.UserDto;
import com.example.techblog.repository.UserRepo;
import com.example.techblog.security.JwtTokenProvider; // Import this!
import com.example.techblog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    // remaining things in project -- 1. login page desing
//    2. registeration page heading
// 3. search , filter, arrange posts
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider; // 1. UNCOMMENTED ✅

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        userService.registerUser(request);
        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    // You need to inject ModelMapper (or map manually)
    // For now, let's map manually to keep it simple without adding more libraries

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponse> login(@RequestBody LoginRequest loginRequest) {

        // 1. Authenticate
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 2. Generate Token
        String token = tokenProvider.generateToken(authentication);

        // 3. GET USER DETAILS (The Missing Piece) 🔍
        // We know the email exists because authentication passed
        User userEntity = userRepo.findByEmail(loginRequest.getEmail()).orElseThrow();

        // 4. Convert Entity to DTO (Safe Data only)
        UserDto userDto = new UserDto();
        userDto.setId(userEntity.getId());
        userDto.setFirstName(userEntity.getFirstName());
        userDto.setLastName(userEntity.getLastName());
        userDto.setEmail(userEntity.getEmail());
        userDto.setGender(userEntity.getGender());
        userDto.setAbout(userEntity.getAbout());
        userDto.setRdate(userEntity.getRdate());

        // 5. Prepare Response
        JwtAuthResponse response = new JwtAuthResponse();
        response.setToken(token);
        response.setUser(userDto); // <--- We fill this now!

        return ResponseEntity.ok(response);
    }


}