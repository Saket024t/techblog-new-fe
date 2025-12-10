package com.example.techblog.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "users")
@Data // Generates Getters, Setters, ToString, HashCode, Equals
@NoArgsConstructor // Generates empty constructor (Required by Hibernate)
@AllArgsConstructor // Generates constructor with all fields
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    private String gender;

    @Column(columnDefinition = "TEXT")
    private String about;

    @Column(updatable = false)
    private LocalDateTime rdate;

    // IMPORTANT: Exclude this from ToString to prevent infinite loops
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Post> posts;

    @PrePersist
    protected void onCreate() {
        this.rdate = LocalDateTime.now();
    }
}