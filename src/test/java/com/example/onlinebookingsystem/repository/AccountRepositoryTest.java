package com.example.onlinebookingsystem.repository;

import com.example.onlinebookingsystem.model.Account;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class AccountRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private AccountRepository accountRepository;

    // Insert mock data before testing
    @Before
    public void setUp() {
        // Set mock data
        Account account = new Account();
        account.setFirstName("An");
        account.setLastName("Le");
        account.setEmail("hoanganleba@gmail.com");
        account.setUserName("An");
        account.setPassword("123");
        account.setRoles("ROLE_USER");
        testEntityManager.persist(account);
        testEntityManager.flush();
    }

    @Test
    public void whenFindByName_thenExecuteCustomer() {
        Account account = accountRepository.findByUserName("An");
        assertThat(account.getUserName()).isEqualTo("An");
        assertThat(account.getFirstName()).isEqualTo("An");
        assertThat(account.getLastName()).isEqualTo("Le");
        assertThat(account.getPassword()).isEqualTo("123");
        assertThat(account.getEmail()).isEqualTo("hoanganleba@gmail.com");
        assertThat(account.getRoles()).isEqualTo("ROLE_USER");
    }

    @Test
    public void whenFindAll_thenReturnCustomerList() {
        List<Account> accounts = accountRepository.findAll();
        assertThat(accounts).hasSize(1);
    }

    @Test
    public void testExistsByUserName() {
        assertThat(accountRepository.existsByUserName("An")).isEqualTo(true);
    }

    @Test
    public void testExistsByEmail() {
        assertThat(accountRepository.existsByEmail("hoanganleba@gmail.com")).isEqualTo(true);
    }

    @Test
    public void testRoles() {
        List<Account> accounts = accountRepository.findByRoles("ROLE_USER");
        assertThat(accounts).hasSize(1);
    }
}
