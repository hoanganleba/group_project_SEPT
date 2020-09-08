package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.Account;
import com.example.onlinebookingsystem.repository.AccountRepository;
import com.example.onlinebookingsystem.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    private final AccountService accountService;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountController(AccountService accountService, AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountService = accountService;
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Get profile of authenticated user
    @GetMapping(value = "/profile")
    public ResponseEntity<Account> getUserLogged(Authentication authentication) {
        Account account = accountRepository.findByUserName(authentication.getName());
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    // Change profile of authenticated user
    @PutMapping(value = "/profile")
    public Optional<ResponseEntity<Object>> updateProfile(Authentication authentication, @RequestBody Account profileReq) {
        Account account = accountRepository.findByUserName(authentication.getName());
        return accountService.findById(account.getId()).map(profile -> {
            profile.setUserName(profileReq.getUserName());
            profile.setEmail(profileReq.getEmail());
            profile.setFirstName(profileReq.getFirstName());
            profile.setLastName(profileReq.getLastName());
            profile.setAddress(profileReq.getAddress());
            profile.setJob(profileReq.getJob());
            profile.setPhone(profileReq.getPhone());
            profile.setGender(profileReq.getGender());
            profile.setPassword(passwordEncoder.encode(profile.getPassword()));
            accountService.save(profile);
            return new ResponseEntity<>(account, HttpStatus.OK);
        });
    }

    // Get all list of user of admin only
    @GetMapping(value = "/customers")
    public Object findAllCustomers(Authentication authentication) {
        Account account = accountRepository.findByUserName(authentication.getName());
        if(account.getRoles().equals("ROLE_ADMIN")) {
            return accountService.findAllCustomers("ROLE_USER");
        }
        return new ResponseEntity<Object>("You have no right to access", HttpStatus.FORBIDDEN);
    }

    // Get specific user account
    @GetMapping(value = "/customers/{customerId}")
    public ResponseEntity<Account> getCustomerById(@PathVariable("customerId") Integer id) {
        Optional<Account> customer = accountService.findById(id);
        return customer.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));
    }

    // Delete the user account
    @DeleteMapping(value = "/customers/{customerId}")
    public Optional<ResponseEntity<Object>> deleteCustomer(@PathVariable Integer customerId) {
        return accountService.findById(customerId).map(customer -> {
            accountService.delete(customer);
            return ResponseEntity.ok().build();
        });
    }
}
