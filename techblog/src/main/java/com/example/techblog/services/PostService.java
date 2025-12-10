package com.example.techblog.services;

import com.example.techblog.entities.Post;
import com.example.techblog.entities.User;
import com.example.techblog.exception.APIException;
import com.example.techblog.exception.ResourceNotFoundException;
import com.example.techblog.payloads.PostDto;
import com.example.techblog.payloads.UserDto;
import com.example.techblog.repository.PostRepo;
import com.example.techblog.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    // 1. GET ALL POSTS
    @Autowired
    private PostRepo postRepo;

    @Autowired
    private UserRepo userRepo;

    public List<PostDto> getAllPosts() {
        List<Post> posts = postRepo.findAll();
        // Convert list of Entities to list of DTOs
        return posts.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public PostDto createPost(PostDto postDto, String email) {
        // 1. Get User by Email (from Token)
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        // 2. Map DTO to Entity
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setCode(postDto.getCode());
        post.setCategory(postDto.getCategory());
        post.setUser(user); // Link the post to the user

        // 3. Save
        Post savedPost = postRepo.save(post);

        // 4. Return DTO
        return mapToDto(savedPost);
    }

    // In PostService.java
    public List<PostDto> getPostsByUserId(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        List<Post> posts = postRepo.findByUser(user);
        return posts.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    // 3. GET POSTS BY LOGGED-IN USER
    public List<PostDto> getPostsByUser(String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", email));

        List<Post> posts = postRepo.findByUser(user);

        return posts.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    // 4. DELETE POST
    public void deletePost(Long postId, String email) {
        Post post = postRepo.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("Post", "id", postId));

        // SECURITY CHECK: Ensure the user deleting the post is the owner
        if (!post.getUser().getEmail().equals(email)) {
            throw new APIException(HttpStatus.FORBIDDEN, "You are not authorized to delete this post");
        }

        postRepo.delete(post);
    }

    // Helper: Map Post Entity to PostDto
    private PostDto mapToDto(Post post) {
        PostDto dto = new PostDto();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setContent(post.getContent());
        dto.setCode(post.getCode());
        dto.setCategory(post.getCategory());
        dto.setPDate(post.getPDate());

        // Map the User (Author) details manually
        User user = post.getUser();
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail()); // Be careful if you want to expose email
        
        dto.setUser(userDto); // Set the nested UserDto
        
        return dto;
    }
}