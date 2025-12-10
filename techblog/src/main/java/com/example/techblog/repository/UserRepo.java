package com.example.techblog.repository;

import com.example.techblog.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> { // Changed Integer to Long
    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email); // Faster optimized check
}