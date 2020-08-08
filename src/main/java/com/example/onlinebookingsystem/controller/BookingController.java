package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.Booking;
import com.example.onlinebookingsystem.model.Customer;
import com.example.onlinebookingsystem.repository.BookingRepository;
import com.example.onlinebookingsystem.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;

    @Autowired
    public BookingController(BookingRepository bookingRepository, CustomerRepository customerRepository) {
        this.bookingRepository = bookingRepository;
        this.customerRepository = customerRepository;
    }

    @GetMapping("/customers/{customerId}/bookings")
    public Iterable<Booking> getAllBookingsByCustomerId(
            @PathVariable(value = "customerId") Integer customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    @PostMapping("/customers/{customerId}/bookings")
    public Booking createBooking(@PathVariable Integer customerId, @RequestBody Booking booking) {
        return customerRepository.findById(customerId).map(customer -> {
            booking.setCustomer(customer);
            return bookingRepository.save(booking);
        }).orElseThrow(() -> new ResourceNotFoundException("Customer [customerId="+customerId+"] can't be found"));
    }

    @DeleteMapping("/customers/{customerId}/bookings/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Integer customerId, @PathVariable Integer bookingId) {

        if (!customerRepository.existsById(customerId)) {
            throw new ResourceNotFoundException("Customer [customerId="+customerId+"] can't be found");
        }

        return bookingRepository.findById(bookingId).map(booking -> {
            bookingRepository.delete(booking);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Booking [bookingId="+bookingId+"] can't be found"));
    }

    @PutMapping("/customers/{customerId}/bookings/{bookingId}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Integer customerId, @PathVariable Integer bookingId, @RequestBody Booking newBooking) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer [customerId="+customerId+"] can't be found"));

        return bookingRepository.findById(bookingId).map(booking -> {
            booking.setStartDateTime(newBooking.getStartDateTime());
            booking.setEndDateTime(newBooking.getEndDateTime());
            newBooking.setCustomer(customer);

            bookingRepository.save(booking);
            return ResponseEntity.ok(newBooking);
        }).orElseThrow(() -> new ResourceNotFoundException("Booking [bookingId="+bookingId+"] can't be found"));
    }
}
