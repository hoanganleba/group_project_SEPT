package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.auth.LoginRequest;
import com.example.onlinebookingsystem.model.Customer;
import com.example.onlinebookingsystem.auth.SignUpRequest;
import com.example.onlinebookingsystem.repository.CustomerRepository;
import com.example.onlinebookingsystem.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public String generateToken(@RequestBody LoginRequest loginRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword())
            );

        } catch (Exception ex) {
            throw new Exception("invalid username/password");
        }
        return jwtUtil.generateToken(loginRequest.getUserName());
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) throws Exception {
        Customer customer = new Customer(
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getEmail(),
                signUpRequest.getUserName(),
                signUpRequest.getPassword(),
                signUpRequest.getRoles()
        );
        customer.setPassword(passwordEncoder.encode(customer.getPassword()));
        customer.setRoles("ROLE_USER");
        Customer result = customerRepository.save(customer);
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    };
}
