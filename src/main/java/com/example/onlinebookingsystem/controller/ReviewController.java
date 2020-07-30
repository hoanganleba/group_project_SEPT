package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.Customer;
import com.example.onlinebookingsystem.model.Review;
import com.example.onlinebookingsystem.repository.CustomerRepository;
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
    private final CustomerRepository customerRepository;

    @Autowired
    public ReviewController(ReviewRepository reviewRepository, CustomerRepository customerRepository) {
        this.reviewRepository = reviewRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/customers/{customerId}/reviews")
    public Iterable<Review> gerAllReviewsByCustomerId(
            @PathVariable(value = "customerId") Integer customerId){
        return reviewRepository.findByCustomerId(customerId);
    }

    @PostMapping(value = "/customers/{customerId}/reviews")
    public Review createReview(@RequestBody Review review, @PathVariable Integer customerId) {
        return customerRepository.findById(customerId).map(customer -> {
            review.setCustomer(customer);
            return reviewRepository.save(review);
        }).orElseThrow(() -> new ResourceNotFoundException("Customer [customerId="+customerId+"] can't be found"));
    }

    @PutMapping(value = "/customers/{customerId}/reviews/{reviewId}")
    public ResponseEntity<Review> updateReview(@PathVariable Integer reviewId, @RequestBody Review newReview, @PathVariable Integer customerId) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer [customerId="+customerId+"] can't be found"));

        return reviewRepository.findById(reviewId).map(review -> {
            review.setRating(newReview.getRating());
            review.setComment(newReview.getComment());
            newReview.setCustomer(customer);
            reviewRepository.save(review);
            return ResponseEntity.ok(newReview);
        }).orElseThrow(() -> new ResourceNotFoundException("Review [reviewId="+reviewId+"] can't be found"));
    }

    @DeleteMapping(value = "/customers/{customerId}/reviews/{reviewId}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Integer reviewId, @PathVariable Integer customerId) {

        if (!customerRepository.existsById(customerId)) {
            throw new ResourceNotFoundException("Customer [customerId="+customerId+"] can't be found");
        }

        return reviewRepository.findById(reviewId).map(review -> {
            reviewRepository.delete(review);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Review [reviewId="+reviewId+"] can't be found"));
    }
}
