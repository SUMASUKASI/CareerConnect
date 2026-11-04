package com.suma.springbootdemo.controller;

import com.suma.springbootdemo.dto.AuthResponse;
import com.suma.springbootdemo.entity.User;
import com.suma.springbootdemo.service.UserService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }
    @PostMapping("/login")
    public AuthResponse loginUser(@RequestBody User user) {
        return userService.loginUser(user);
    }
}