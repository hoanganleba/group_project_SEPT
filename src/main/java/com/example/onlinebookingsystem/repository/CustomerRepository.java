package com.example.onlinebookingsystem.repository;

import com.example.onlinebookingsystem.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Customer findByUserName(String userName);
}
