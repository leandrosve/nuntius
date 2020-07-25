package com.leandrosve.nuntius.beans;

import com.leandrosve.nuntius.model.User;

public class SessionDTO {

    private String username;

    private String email;

    private String name;

    private String biography;
    
    private Long id;

    private String jwtToken;

    

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public SessionDTO(User user, String jwtToken) {
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.name = user.getName();
        this.id = user.getId();
        this.biography = user.getBiography();
        this.jwtToken = jwtToken;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }
    
    
}