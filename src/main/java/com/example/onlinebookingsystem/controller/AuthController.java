package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.AuthRequest;
import com.example.onlinebookingsystem.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/authenticate")
    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword())
            );

        } catch (Exception ex) {
            throw new Exception("invalid username/password");
        }
        return jwtUtil.generateToken(authRequest.getUserName());
    }
}
