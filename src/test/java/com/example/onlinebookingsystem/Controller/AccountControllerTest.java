package com.example.onlinebookingsystem.Controller;

import com.example.onlinebookingsystem.controller.AccountController;
import com.example.onlinebookingsystem.model.Account;
import com.example.onlinebookingsystem.repository.AccountRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AccountControllerTest {
    @InjectMocks
    private AccountController accountController;

    @Mock
    private AccountRepository accountRepository;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetUserByUserName() {
        Account account = new Account();
        account.setUserName("An");
        when(accountRepository.findByUserName("An")).thenReturn(account);
    }
}
