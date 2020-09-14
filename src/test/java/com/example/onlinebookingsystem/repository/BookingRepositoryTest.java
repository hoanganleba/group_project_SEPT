package com.example.onlinebookingsystem.repository;

import com.example.onlinebookingsystem.model.Account;
import com.example.onlinebookingsystem.model.Booking;
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
public class BookingRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private BookingRepository bookingRepository;

    // Insert mock data before testing
    @Before
    public void setUp() {
        // Set mock data
        Account account = new Account();
        Booking booking = new Booking();
        account.setFirstName("An");
        account.setLastName("Le");
        account.setEmail("hoanganleba@gmail.com");
        account.setUserName("An");
        account.setPassword("123");
        account.setRoles("ROLE_USER");
        testEntityManager.persist(account);
        booking.setStartDateTime("2020-08-28 12:00:00");
        booking.setEndDateTime("2020-08-28 12:00:00");
        booking.setType("Normal");
        booking.setAccount(account);
        testEntityManager.persist(booking);
        testEntityManager.flush();
    }

    @Test
    public void whenFindAll_thenReturnBookingList() {
        List<Booking> bookings = bookingRepository.findAll();
        assertThat(bookings).hasSize(1);
    }
}

