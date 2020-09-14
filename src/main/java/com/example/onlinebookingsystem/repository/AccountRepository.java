package com.example.onlinebookingsystem.repository;

import com.example.onlinebookingsystem.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Integer> {
    Account findByUserName(String userName);
    List<Account> findByRoles(String roles);
    Boolean existsByUserName(String userName);
    Boolean existsByEmail(String email);
}
