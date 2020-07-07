package com.leandrosve.nuntius.service;

import java.util.List;
import com.leandrosve.nuntius.facade.IAuthenticationFacade;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private IUserRepository usersRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private IAuthenticationFacade authenticationFacade;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        UserDetails user = usersRepository.findByUsername(username);
        if (user != null) {
        return user;
        }else{
            throw new UsernameNotFoundException("User");
        }
    }

    public void createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        try {
            usersRepository.save(user);
        } catch (DataIntegrityViolationException e) {
            throw new DataIntegrityViolationException("Username already exists", e);
        }
    }

    public List<User> listUsers() {
        return usersRepository.findAll();
    }

    public UserDetails profile() {
        return authenticationFacade.getCurrentUser();
    }  

}