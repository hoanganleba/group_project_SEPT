package com.example.onlinebookingsystem.service;

import com.example.onlinebookingsystem.model.Account;
import com.example.onlinebookingsystem.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    public final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public List<Account> findAllCustomers(String roles) {
        return accountRepository.findByRoles(roles);
    }

    public Optional<Account> findById(Integer id) {
        return accountRepository.findById(id);
    }

    public void save(Account account) {
        accountRepository.save(account);
    }

    public void delete(Account account) {
        accountRepository.delete(account);
    }

}
