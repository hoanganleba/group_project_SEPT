package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.Account;
import com.example.onlinebookingsystem.model.Employee;
import com.example.onlinebookingsystem.repository.AccountRepository;
import com.example.onlinebookingsystem.repository.EmployeeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://online-booking-sept.s3-website-ap-southeast-1.amazonaws.com")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;
    private final AccountRepository accountRepository;

    public EmployeeController(EmployeeRepository employeeRepository, AccountRepository accountRepository) {
        this.employeeRepository = employeeRepository;
        this.accountRepository = accountRepository;
    }

    // Get all employees list for admin only
    @GetMapping("/employees")
    public Object getAllEmployees(Authentication authentication) {
        Account account = accountRepository.findByUserName(authentication.getName());
        if(account.getRoles().equals("ROLE_ADMIN")) {
            return employeeRepository.findAll();
        }
        return new ResponseEntity<Object>("You have no right to access", HttpStatus.FORBIDDEN);
    }

    // Get employee by employee id for admin only
    @GetMapping("/employees/{employeeId}")
    public Object getAllEmployeeById(Authentication authentication, @PathVariable Integer employeeId) {
        Account account = accountRepository.findByUserName(authentication.getName());
        if(account.getRoles().equals("ROLE_ADMIN")) {
            return employeeRepository.findById(employeeId);
        }
        return new ResponseEntity<Object>("You have no right to access", HttpStatus.FORBIDDEN);
    }

    // Create new employee for admin only
    @PostMapping("/employees")
    public Object createEmployee(Authentication authentication, @RequestBody Employee employee) {
        Account account = accountRepository.findByUserName(authentication.getName());
        if(account.getRoles().equals("ROLE_ADMIN")) {
            return employeeRepository.save(employee);
        }
        return new ResponseEntity<Object>("You have no right to access", HttpStatus.FORBIDDEN);
    }

    // Update new employee for admin only
    @PutMapping("/employees/{employeeId}")
    public Object updateEmployee(Authentication authentication, @RequestBody Employee newEmployee, @PathVariable Integer employeeId) {
        Account account = accountRepository.findByUserName(authentication.getName());
        if(account.getRoles().equals("ROLE_ADMIN")) {
            return employeeRepository.findById(employeeId).map(employee -> {
                employee.setFirstName(newEmployee.getFirstName());
                employee.setLastName(newEmployee.getLastName());
                employee.setAddress(newEmployee.getAddress());
                employee.setEmail(newEmployee.getEmail());
                employee.setJob(newEmployee.getJob());
                employee.setPhone(newEmployee.getPhone());
                employee.setGender(newEmployee.getGender());
                employee.setAchievements(newEmployee.getAchievements());
                employee.setWorkExperience(newEmployee.getWorkExperience());
                employeeRepository.save(employee);
                return ResponseEntity.ok(newEmployee);
            });
        }
        return new ResponseEntity<Object>("You have no right to access", HttpStatus.FORBIDDEN);
    }

    // Delete employee for admin only
    @DeleteMapping("/employees/{employeeId}")
    public Object deleteEmployee(Authentication authentication, @PathVariable Integer employeeId) {
        Account account = accountRepository.findByUserName(authentication.getName());
        if(account.getRoles().equals("ROLE_ADMIN")) {
            return employeeRepository.findById(employeeId).map(employee -> {
                employeeRepository.delete(employee);
                return ResponseEntity.ok().build();
            });
        }
        return new ResponseEntity<Object>("You have no right to access", HttpStatus.FORBIDDEN);
    }
}
