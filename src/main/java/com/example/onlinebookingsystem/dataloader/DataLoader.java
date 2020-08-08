package com.example.onlinebookingsystem.dataloader;

import com.example.onlinebookingsystem.model.Booking;
import com.example.onlinebookingsystem.model.Customer;
import com.example.onlinebookingsystem.model.Review;
import com.example.onlinebookingsystem.repository.BookingRepository;
import com.example.onlinebookingsystem.repository.CustomerRepository;
import com.example.onlinebookingsystem.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    private final BookingRepository bookingRepository;
    private final CustomerRepository customerRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public DataLoader(BookingRepository bookingRepository, CustomerRepository customerRepository, ReviewRepository reviewRepository) {
        this.bookingRepository = bookingRepository;
        this.customerRepository = customerRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        Customer customer = new Customer(  "An", "Le", "hoanganleba@gmail.com", "An",  "123", "ROLE_USER");
        Customer customer1 = new Customer("Hoang", "Le", "hellosomething@gmail.com","Hello" ,"456", "ROLE_USER");
        customerRepository.save(customer);
        customerRepository.save(customer1);

        this.bookingRepository.save(new Booking("2020-7-21 09:00pm", "2020-7-21 10:00am", "normal", customer));
        this.bookingRepository.save(new Booking("2020-7-21 07:00pm", "2020-7-21 18:00am", "normal",customer));
        this.bookingRepository.save(new Booking("2020-7-21 06:00pm", "2020-7-21 21:00am","normal", customer));

        this.bookingRepository.save(new Booking("2020-7-21 09:00pm", "2020-7-21 10:00am","normal", customer1));
        this.bookingRepository.save(new Booking("2020-7-21 07:00pm", "2020-7-21 18:00am","normal", customer1));
        this.bookingRepository.save(new Booking("2020-7-21 06:00pm", "2020-7-21 21:00am","normal", customer1));

        this.reviewRepository.save(new Review(5,"Hello", customer));
        this.reviewRepository.save(new Review(1,"Hello", customer));
        this.reviewRepository.save(new Review(2,"Hello", customer));

        this.reviewRepository.save(new Review(5,"Hello", customer1));
        this.reviewRepository.save(new Review(1,"Hello", customer1));
        this.reviewRepository.save(new Review(2,"Hello", customer1));
    }
}
