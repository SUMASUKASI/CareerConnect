package com.suma.springbootdemo.service;

import com.suma.springbootdemo.security.JwtUtil;
import com.suma.springbootdemo.dto.AuthResponse;
import com.suma.springbootdemo.entity.User;
import com.suma.springbootdemo.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public UserService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    // Register new user
    public String registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already registered!"
            );
        }

        // Validate user role
        String role = user.getRole();

        if (role == null || role.isBlank()) {
            role = "JOB_SEEKER";
        }

        if (!role.equals("JOB_SEEKER") && !role.equals("RECRUITER")) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid user role"
            );
        }

        user.setRole(role);

        // Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);

        return "User registered successfully!";
    }

    // Login user
    public AuthResponse loginUser(User user) {

        User existingUser = userRepository.findByEmail(user.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED,
                        "Invalid email or password"
                ));

        if (!passwordEncoder.matches(
                user.getPassword(), existingUser.getPassword())) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid email or password"
            );
        }

        String token = jwtUtil.generateToken(existingUser.getEmail());

        return new AuthResponse(
                "Login successful!",
                token,
                existingUser.getRole()
        );
    }
}