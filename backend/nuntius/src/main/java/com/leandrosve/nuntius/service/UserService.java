package com.leandrosve.nuntius.service;

import java.util.ArrayList;
import java.util.List;

import com.leandrosve.nuntius.beans.UserDTO;
import com.leandrosve.nuntius.exception.BadRequestException;
import com.leandrosve.nuntius.exception.UserNotFoundException;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.repository.IUserRepository;
import com.leandrosve.nuntius.specification.UserSpecification;
import com.leandrosve.nuntius.util.AuthUtil;
import com.leandrosve.nuntius.util.LangUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.*;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

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
        return usersRepository.findById(id).get();

    }

    public User getUser(String username){
        User user = usersRepository.findByUsername(username);
        if(user == null){throw new UserNotFoundException();}
        return user;
    }

    public UserDTO getUserByUsername(String username){
        return mapToDTO(getUser(username));
    }

    public UserDTO getUserById(Long id){
        User user = usersRepository.findById(id).orElseThrow(()-> new UserNotFoundException());
        return mapToDTO(user);
    }

	public List<UserDTO> searchUsers(UserSpecification userSpecification) {
        final User currentUser = authUtil.getCurrentUser();
        final List<User> users = usersRepository.findAll(userSpecification);
        List<UserDTO> userDTOs = new ArrayList<UserDTO>();
        users.forEach((u) -> {if(u != currentUser){userDTOs.add( mapToDTO(u));}});
        return userDTOs;
	}

    public UserDTO mapToDTO(User user){
        return new UserDTO(user.getId(), user.getUsername(), user.getBiography(), user.getName());
    }

    public UserDTO editProfile(User user) {
        User currentUser = authUtil.getCurrentUser();
        if(user.getBiography() != null)
             currentUser.setBiography(user.getBiography());
        if(user.getName() != null && !user.getName().isEmpty())
             currentUser.setName(user.getName());
        usersRepository.save(currentUser);
        return mapToDTO(currentUser);

    }


}