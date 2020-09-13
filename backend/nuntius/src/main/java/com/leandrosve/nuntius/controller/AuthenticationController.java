package com.leandrosve.nuntius.controller;

import javax.websocket.Session;

import com.leandrosve.nuntius.beans.SessionDTO;
import com.leandrosve.nuntius.model.User;
import com.leandrosve.nuntius.model.authentication.AuthenticationRequest;
import com.leandrosve.nuntius.model.authentication.AuthenticationResponse;
import com.leandrosve.nuntius.model.authentication.RefreshTokenRequest;
import com.leandrosve.nuntius.repository.IUserRepository;
import com.leandrosve.nuntius.service.UserService;
import com.leandrosve.nuntius.util.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private IUserRepository userRepository;
    

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public ResponseEntity<SessionDTO> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(),
                authenticationRequest.getPassword()));

        //final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final User userDetails = userRepository.findByUsername(authenticationRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        final SessionDTO sessionDTO = new SessionDTO(userDetails, jwt);
       // return ResponseEntity.ok(new AuthenticationResponse(jwt));
       return ResponseEntity.ok(sessionDTO);
    }

    
        @PostMapping("/authenticate/refresh")
    public ResponseEntity<SessionDTO> refreshAuthentication(@RequestBody RefreshTokenRequest data) {
        User user = userRepository.findByUsername(data.getUsername());
        boolean validated = jwtUtil.validateToken(data.getJwtToken(),user);

        if (!validated) {
            return new ResponseEntity<SessionDTO>(HttpStatus.UNAUTHORIZED);
        }
        final String newJwt = jwtUtil.generateToken(user);

        final SessionDTO sessionDTO = new SessionDTO(user, newJwt);

        return ResponseEntity.ok(sessionDTO);
    }

}