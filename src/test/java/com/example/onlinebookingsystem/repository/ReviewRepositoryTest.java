package com.example.onlinebookingsystem.repository;

import com.example.onlinebookingsystem.model.Account;
import com.example.onlinebookingsystem.model.Booking;
import com.example.onlinebookingsystem.model.Review;
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
public class ReviewRepositoryTest {

    @Autowired
    private TestEntityManager testEntityManager;

    @Autowired
    private ReviewRepository reviewRepository;

    // Insert mock data before testing
    @Before
    public void setUp() {
        // Set mock data
        Account account = new Account();
        Review review = new Review();
        account.setFirstName("An");
        account.setLastName("Le");
        account.setEmail("hoanganleba@gmail.com");
        account.setUserName("An");
        account.setPassword("123");
        account.setRoles("ROLE_USER");
        testEntityManager.persist(account);
        review.setAccount(account);
        review.setComment("Hello");
        review.setRating(5);
        testEntityManager.persist(review);
        testEntityManager.flush();
    }

    @Test
    public void whenFindAll_thenReturnReviewList() {
        List<Review> reviews = reviewRepository.findAll();
        assertThat(reviews).hasSize(1);
    }
}
