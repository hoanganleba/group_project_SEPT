package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.Booking;
import com.example.onlinebookingsystem.model.Account;
import com.example.onlinebookingsystem.repository.BookingRepository;
import com.example.onlinebookingsystem.repository.AccountRepository;
import net.minidev.json.JSONObject;
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
@CrossOrigin(origins = "http://online-booking-sept.s3-website-ap-southeast-1.amazonaws.com")
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

    // Change status
    @PutMapping("/bookings/{bookingId}")
    public Object changeStatus(Authentication authentication, @PathVariable Integer bookingId, @RequestBody Booking bookingReq) {
        Account account = accountRepository.findByUserName(authentication.getName());
        JSONObject resp = new JSONObject();
        resp.put("message", "You have no right to access");
        if(account.getRoles().equals("ROLE_ADMIN")) {
            return bookingRepository.findById(bookingId).map(booking -> {
                booking.setStatus(bookingReq.getStatus());
                bookingRepository.save(booking);
                return ResponseEntity.ok(booking);
            });
        }
        return new ResponseEntity<Object>(resp, HttpStatus.FORBIDDEN);
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
    public ResponseEntity<?> createBooking(Authentication authentication, @RequestBody Booking booking) {
        Account account = accountRepository.findByUserName(authentication.getName());
        Integer accountId = account.getId();
        LocalDate currentDate = LocalDate.now();
        LocalDate futureDate = LocalDate.now().plusDays(7);
        LocalTime currentTime = LocalTime.now();

        // Format start date and time
        String[] startDateTimeFormat = booking.getStartDateTime().split(" ");
        String[] endDateTimeFormat = booking.getEndDateTime().split(" ");

        // Start time
        String date1 = startDateTimeFormat[0];
        String time1 = startDateTimeFormat[1];
        String startDateTime = startDateTimeFormat[0] + " " + startDateTimeFormat[1];
        LocalDate startDate = LocalDate.parse(date1);
        LocalTime startTime = LocalTime.parse(time1);

        // End time
        String date2 = endDateTimeFormat[0];
        String time2 = endDateTimeFormat[1];
        String endDateTime = startDateTimeFormat[0] + " " + startDateTimeFormat[1];
        LocalDate endDate = LocalDate.parse(date2);
        LocalTime endTime = LocalTime.parse(time2);

        return (ResponseEntity<?>) accountRepository.findById(accountId).map(customer -> {

            // Reject if book the past date and time
            if(startDate.isBefore(currentDate) && startTime.isBefore(currentTime) || (endDate.isBefore(currentDate) && endTime.isBefore(currentTime))){
                JSONObject resp = new JSONObject();
                resp.put("message", "You cannot book the past day or time");
                return new ResponseEntity<Object>(resp, HttpStatus.FORBIDDEN);
            }

            // Reject if booking is duplicate
            if(bookingRepository.existsByStartDateTime(startDateTime)) {
                JSONObject resp = new JSONObject();
                resp.put("message", "You already booked. Please book another one");
                return new ResponseEntity<Object>(resp, HttpStatus.FORBIDDEN);
            }

            if(bookingRepository.existsByEndDateTime(endDateTime)) {
                JSONObject resp = new JSONObject();
                resp.put("message", "You already booked. Please book another one");
                return new ResponseEntity<Object>(resp, HttpStatus.FORBIDDEN);
            }

            // Reject if book more than a week
            if(startDate.isAfter(futureDate) || endDate.isAfter(futureDate)){
                JSONObject resp = new JSONObject();
                resp.put("message", "You cannot book more than a week");
                return new ResponseEntity<Object>(resp, HttpStatus.FORBIDDEN);
            }

            // Add new booking && Status pending is set by default
            booking.setStatus("Pending");
            booking.setAccount(customer);
            bookingRepository.save(booking);
            return ResponseEntity.ok(booking);
        }).orElseThrow(() -> new ResourceNotFoundException("Error"));
    }

    // Change the booking date and time for authenticated user
    @PutMapping("/profile/bookings/{bookingId}")
    public ResponseEntity<?> updateBooking(Authentication authentication, @PathVariable Integer bookingId, @RequestBody Booking newBooking) {
        Account account = accountRepository.findByUserName(authentication.getName());

        LocalDate currentDate = LocalDate.now();
        LocalDate futureDate = LocalDate.now().plusDays(7);
        LocalTime currentTime = LocalTime.now();

        // Format start date and time
        String[] startDateTimeFormat = newBooking.getStartDateTime().split(" ");
        String[] endDateTimeFormat = newBooking.getEndDateTime().split(" ");

        // Start time
        String date1 = startDateTimeFormat[0];
        String time1 = startDateTimeFormat[1];
        LocalDate startDate = LocalDate.parse(date1);
        LocalTime startTime = LocalTime.parse(time1);

        // End time
        String date2 = endDateTimeFormat[0];
        String time2 = endDateTimeFormat[1];
        LocalDate endDate = LocalDate.parse(date2);
        LocalTime endTime = LocalTime.parse(time2);

        return bookingRepository.findById(bookingId).map(booking -> {

            // Reject if book the past date and time
            if(startDate.isBefore(currentDate) && startTime.isBefore(currentTime) || (endDate.isBefore(currentDate) && endTime.isBefore(currentTime))){
                JSONObject resp = new JSONObject();
                resp.put("message", "You cannot book the past day or time");
                return new ResponseEntity<Object>(resp, HttpStatus.FORBIDDEN);
            }

            // Reject if book more than a week
            if(startDate.isAfter(futureDate) || endDate.isAfter(futureDate)){
                JSONObject resp = new JSONObject();
                resp.put("message", "You cannot book more than a week");
                return new ResponseEntity<Object>(resp, HttpStatus.FORBIDDEN);
            }

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
