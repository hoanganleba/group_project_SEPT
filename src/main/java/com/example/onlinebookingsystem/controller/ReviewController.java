package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.Customer;
import com.example.onlinebookingsystem.model.Review;
import com.example.onlinebookingsystem.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @GetMapping(value = "/customers/{customerId}/reviews/{reviewId}")

    public ResponseEntity<Review> getReviewById(
           @PathVariable("reviewId") Integer reviewId) {

        Optional<Review> Review = reviewRepository.findById(reviewId);
        return Review.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NO_CONTENT));

    }
    @PostMapping(value = "/customers/{customerId}/reviews")
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        reviewRepository.save(review);
        return new ResponseEntity<>(review, HttpStatus.CREATED);
    }



    @PutMapping(value = "/customers/{customerId}/reviews/{reviewId}")
    public Optional<ResponseEntity<Review>> updateReview(@PathVariable Integer reviewId, @RequestBody Review reviewReq) {
        return reviewRepository.findById(reviewId).map(review -> {
            review.setRating(reviewReq.getRating());
            review.setComment(reviewReq.getComment());
            review.setCustomer(reviewReq.getCustomer());

            reviewRepository.save(review);
            return new ResponseEntity<>(HttpStatus.OK);
        });
    }

    @DeleteMapping(value = "/customers/{customerId}/reviews/{reviewId}")
    public Optional<ResponseEntity<Object>> deleteCustomer(@PathVariable Integer reviewId) {
        return reviewRepository.findById(reviewId).map(review -> {
            reviewRepository.delete(review);
            return ResponseEntity.ok().build();
        });
    }



}
