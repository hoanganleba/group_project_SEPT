package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.Account;
import com.example.onlinebookingsystem.model.Review;
import com.example.onlinebookingsystem.repository.AccountRepository;
import com.example.onlinebookingsystem.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public ReviewController(ReviewRepository reviewRepository, AccountRepository accountRepository) {
        this.reviewRepository = reviewRepository;
        this.accountRepository = accountRepository;
    }

    // Get all reviews
    @GetMapping("/reviews")
    public Iterable<Review> getAllReviews(){
        return reviewRepository.findAll();
    }

    // Get by customer id
    @GetMapping("/customers/{customerId}/reviews")
    public Iterable<Review> gerAllReviewsByCustomerId(@PathVariable Integer customerId){
        return reviewRepository.findByAccountId(customerId);
    }

    // Add new reviews
    @PostMapping(value = "/customers/{customerId}/reviews")
    public Review createReview(@RequestBody Review review, @PathVariable Integer customerId) {
        return accountRepository.findById(customerId).map(customer -> {
            review.setAccount(customer);
            return reviewRepository.save(review);
        }).orElseThrow(() -> new ResourceNotFoundException("Customer [customerId="+customerId+"] can't be found"));
    }

    @PutMapping(value = "/customers/{customerId}/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable Integer reviewId, @RequestBody Review newReview, @PathVariable Integer customerId) {
        Account account = accountRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer [customerId="+customerId+"] can't be found"));

        return reviewRepository.findById(reviewId).map(review -> {
            review.setRating(newReview.getRating());
            review.setComment(newReview.getComment());
            newReview.setAccount(account);
            reviewRepository.save(review);
            return ResponseEntity.ok(newReview);
        }).orElseThrow(() -> new ResourceNotFoundException("Review [reviewId="+reviewId+"] can't be found"));
    }

    @DeleteMapping(value = "/customers/{customerId}/reviews/{reviewId}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Integer reviewId, @PathVariable Integer customerId) {

        if (!accountRepository.existsById(customerId)) {
            throw new ResourceNotFoundException("Customer [customerId="+customerId+"] can't be found");
        }

        return reviewRepository.findById(reviewId).map(review -> {
            reviewRepository.delete(review);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Review [reviewId="+reviewId+"] can't be found"));
    }
}
