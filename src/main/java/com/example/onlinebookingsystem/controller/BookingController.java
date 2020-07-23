package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.Booking;
import com.example.onlinebookingsystem.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/customers/{customerId}/bookings")
    public Iterable<Booking> getAllBookingsByCustomerId(
            @PathVariable(value = "customerId") Integer customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }
}
