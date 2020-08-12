package com.leandrosve.nuntius.model.authentication;

import javax.validation.constraints.NotEmpty;

public class RefreshTokenRequest {
    @NotEmpty
    private String username;
    @NotEmpty
    private String jwtToken;

    public RefreshTokenRequest(String username, String jwtToken) {
        this.username = username;
        this.jwtToken = jwtToken;
    }
    public RefreshTokenRequest() {
        super();
    }
        
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    
   
    
}