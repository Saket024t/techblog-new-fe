package com.example.techblog.services;

import com.example.techblog.entities.User;
import com.example.techblog.exception.APIException;
import com.example.techblog.exception.ResourceNotFoundException;
import com.example.techblog.payloads.RegisterRequest;
import com.example.techblog.payloads.UserDto;
import com.example.techblog.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder; // We will configure this in Phase 3

    public void registerUser(RegisterRequest request) {
        // 1. Check if email exists
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new APIException(HttpStatus.BAD_REQUEST, "Email already exists!");
        }

        // 2. Map DTO to Entity
        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());
        user.setGender(request.getGender());
        user.setAbout(request.getAbout());

        // 3. ENCRYPT THE PASSWORD (Crucial Step)
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // 4. Save
        userRepo.save(user);
    }

    // Note: The 'login' method is REMOVED from here.
    // In Spring Security, login logic is handled by the AuthenticationManager in the Controller.

    public UserDto updateUser(UserDto userDto, String email) {
        // Fetch the user based on the Email from the Token (Secure)
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        // Update fields (We do NOT update Email or Password here for safety)
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setGender(userDto.getGender());
        user.setAbout(userDto.getAbout());

        // Save to DB
        User updatedUser = userRepo.save(user);

        // Convert back to DTO
        return mapToDto(updatedUser);
    }

    public UserDto getUserById(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        return mapToDto(user);
    }

    // Helper: Map Entity to DTO
    public UserDto mapToDto(User user){
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setGender(user.getGender());
        dto.setAbout(user.getAbout());
        dto.setRdate(user.getRdate());
        return dto;
    }
}