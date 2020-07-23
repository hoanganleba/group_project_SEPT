package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.Review;
import com.example.onlinebookingsystem.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @GetMapping("/customers/{customerId}/reviews")
    public Iterable<Review> gerAllReviewsByCustomerId(
            @PathVariable(value = "customerId") Integer customerId){
        return reviewRepository.findByCustomerId(customerId);
    }
}
