package com.leandrosve.nuntius.service;

import java.util.List;

import com.leandrosve.nuntius.exception.BadRequestException;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.repository.IUserRepository;
import com.leandrosve.nuntius.util.AuthUtil;
import com.leandrosve.nuntius.util.LangUtil;

import org.springframework.beans.factory.annotation.Autowired;
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
    private AuthUtil authUtil;

    @Autowired
    LangUtil langUtil;
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
        if(usersRepository.existsByUsername(user.getUsername())){
            throw new BadRequestException(langUtil.t("username.taken"));
        };
        if(usersRepository.existsByEmail(user.getEmail())){
            throw new BadRequestException(langUtil.t("email.taken"));
        };
        user.setPassword(passwordEncoder.encode(user.getPassword()));       
        usersRepository.save(user);     
    }

    public List<User> listUsers() {
        return usersRepository.findAll();
    }

    public UserDetails profile() {
        return authUtil.getCurrentUser();
    }  

    public User getUser(Long id){
        return usersRepository.findById(id);

    }

    public User getUser(String username){
        return usersRepository.findByUsername(username);

    }

}