package com.example.onlinebookingsystem.repository;

import com.example.onlinebookingsystem.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    Iterable<Review> findByAccountId(Integer accountId);
}
