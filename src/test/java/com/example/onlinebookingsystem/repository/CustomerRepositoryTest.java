package com.example.onlinebookingsystem.repository;

import com.example.onlinebookingsystem.model.Customer;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
public class CustomerRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private CustomerRepository customerRepository;

    @Test
    public void whenFindByName_thenExecuteCustomer() {
        Customer an = new Customer("An", "Le", "hoanganleba@gmail.com", "An", "123", "ROLE_USER");
        entityManager.persist(an);
        entityManager.flush();

        Customer found = customerRepository.findByUserName(an.getUserName());

        assertThat(found.getUserName()).isEqualTo(an.getUserName());
    }
}
