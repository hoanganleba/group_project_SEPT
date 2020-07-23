package com.example.onlinebookingsystem.repository;

import com.example.onlinebookingsystem.model.Review;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface ReviewRepository extends CrudRepository<Review, Integer> {
    Iterable<Review> findByCustomerId(Integer customerId);
}
