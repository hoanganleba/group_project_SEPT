package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.Customer;
import com.example.onlinebookingsystem.repository.CustomerRepository;
import com.example.onlinebookingsystem.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;


import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {

    private final CustomerService customerService;
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerController(CustomerService customerService, CustomerRepository customerRepository) {
        this.customerService = customerService;
        this.customerRepository = customerRepository;
    }

    @GetMapping(value = "/customers")
    public List<Customer> findAllCustomers() {
        return customerService.findAllCustomers();
    }

    @GetMapping(value = "/user")
    public ResponseEntity<Customer> getUserLogged(Authentication authentication){
        Customer customer = customerRepository.findByUserName(authentication.getName());
        return new ResponseEntity<>(customer, HttpStatus.OK);
    }

    @GetMapping(value = "/customers/{customerId}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable("customerId") Integer id) {
        Optional<Customer> customer = customerService.findById(id);
        return customer.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));

    }

    @PostMapping(value = "/customers")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        customerService.save(customer);
        return new ResponseEntity<>(customer, HttpStatus.CREATED);
    }

    @PutMapping(value = "/customers/{customerId}")
    public Optional<ResponseEntity<Customer>> updateCustomer(@PathVariable Integer customerId, @RequestBody Customer customerReq) {
        return customerService.findById(customerId).map(customer -> {
            customer.setEmail(customerReq.getEmail());
            customer.setFirstName(customerReq.getFirstName());
            customer.setLastName(customerReq.getLastName());
            customer.setPassword(customerReq.getPassword());
            customerService.save(customer);
            return new ResponseEntity<>(HttpStatus.OK);
        });
    }

    @DeleteMapping(value = "/customers/{customerId}")
    public Optional<ResponseEntity<Object>> deleteCustomer(@PathVariable Integer customerId) {
        return customerService.findById(customerId).map(customer -> {
            customerService.delete(customer);
            return ResponseEntity.ok().build();
        });
    }
}
