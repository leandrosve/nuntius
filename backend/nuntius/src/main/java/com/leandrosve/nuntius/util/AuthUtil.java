package com.leandrosve.nuntius.util;

import com.leandrosve.nuntius.exception.AccessDeniedException;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.repository.IUserRepository;
import com.leandrosve.nuntius.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthUtil {
    
    @Autowired
    IUserRepository userRepository;

    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    public User getCurrentUser() {
    return userRepository.findByUsername(getAuthentication().getName());
    }

    public Boolean isUserAuthenticated(Long id){
        return (getCurrentUser().getId() == (id));
    }

    public void authenticate(Long id){
        if(!isUserAuthenticated(id)){
            throw new AccessDeniedException();
        };
    }
}