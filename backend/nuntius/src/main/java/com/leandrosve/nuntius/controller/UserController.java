package com.leandrosve.nuntius.controller;

import java.util.List;

import javax.validation.Valid;

import com.leandrosve.nuntius.beans.UserDTO;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.service.UserService;
import com.leandrosve.nuntius.specification.UserSpecification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public List<User> users() {
        return userService.listUsers();
    }

    @GetMapping("/user")
    public UserDTO getUser(@RequestParam String username) {
        return userService.getUserByUsername(username);
    }

    @GetMapping("/users/{id}")
    public UserDTO getUserById(@PathVariable  Long id) {
        return userService.getUserById(id);
    }

    @GetMapping("/profile")
    public UserDetails profile() {
        return userService.profile();
    }

    @GetMapping("/users/search")
    public List<UserDTO> search(@RequestParam String q) { 
         User user= new User();
         user.setName(q);
         user.setUsername(q);
        return userService.searchUsers(new UserSpecification(user));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody @Valid User user){
        userService.createUser(user);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
  
}