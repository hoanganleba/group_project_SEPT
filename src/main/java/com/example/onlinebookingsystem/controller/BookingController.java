package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.Booking;
import com.example.onlinebookingsystem.model.Account;
import com.example.onlinebookingsystem.repository.BookingRepository;
import com.example.onlinebookingsystem.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final AccountRepository accountRepository;

    @Autowired
    public BookingController(BookingRepository bookingRepository, AccountRepository accountRepository) {
        this.bookingRepository = bookingRepository;
        this.accountRepository = accountRepository;
    }

    // Get all booking list
    @GetMapping("/bookings")
    public Iterable<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get all booking history of authenticated user
    @GetMapping("/profile/bookings")
    public Iterable<Booking> getAllBookingsByAccountId(Authentication authentication) {
        Account account = accountRepository.findByUserName(authentication.getName());
        Integer accountId = account.getId();
        return bookingRepository.findByAccountId(accountId);
    }

    // Create new booking for authenticated user
    @PostMapping("/profile/bookings")
    public Object createBooking(Authentication authentication, @RequestBody Booking booking) {
        Account account = accountRepository.findByUserName(authentication.getName());
        Integer accountId = account.getId();
        LocalDate currentDate = LocalDate.now();
        LocalDate futureDate = LocalDate.now().plusDays(7);
        LocalTime currentTime = LocalTime.now();

        // Format start date and time
        String[] startDateTimeFormat = booking.getStartDateTime().split(" ");
        String date1 = startDateTimeFormat[0];
        String time1 = startDateTimeFormat[1];
        LocalDate startDate = LocalDate.parse(date1);
        LocalTime startTime = LocalTime.parse(time1);

        return accountRepository.findById(accountId).map(customer -> {

            // Reject if book the past date and time
            if(startDate.isBefore(currentDate) && startTime.isBefore(currentTime)){
                return new ResponseEntity<Object>("You cannot book the past day or time", HttpStatus.FORBIDDEN);
            }

            // Reject if book more than a week
            if(startDate.isAfter(futureDate)){
                return new ResponseEntity<Object>("You cannot book more than a week", HttpStatus.FORBIDDEN);
            }

            // Add new booking && Status pending is set by default
            booking.setStatus("Pending");
            booking.setAccount(customer);
            return bookingRepository.save(booking);
        });
    }

    // Change the booking date and time for authenticated user
    @PutMapping("/profile/bookings/{bookingId}")
    public ResponseEntity<Booking> updateBooking(Authentication authentication, @PathVariable Integer bookingId, @RequestBody Booking newBooking) {
        Account account = accountRepository.findByUserName(authentication.getName());

        return bookingRepository.findById(bookingId).map(booking -> {
            booking.setStartDateTime(newBooking.getStartDateTime());
            booking.setEndDateTime(newBooking.getEndDateTime());
            booking.setStatus("Pending");
            newBooking.setAccount(account);

            bookingRepository.save(booking);
            return ResponseEntity.ok(newBooking);
        }).orElseThrow(() -> new ResourceNotFoundException("Booking [bookingId="+bookingId+"] can't be found"));
    }

    // Cancel booking
    @DeleteMapping("/profile/bookings/{bookingId}")
    public ResponseEntity<?> deleteBooking(@PathVariable Integer bookingId) {
        return bookingRepository.findById(bookingId).map(booking -> {
            bookingRepository.delete(booking);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("Booking [bookingId="+bookingId+"] can't be found"));
    }
}
