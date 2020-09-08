package com.example.onlinebookingsystem.repository;

import com.example.onlinebookingsystem.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface BookingRepository extends JpaRepository<Booking, Integer> {
    Iterable<Booking> findByAccountId(Integer accountId);
    Boolean existsByStartDateTime(String startDateTime);
    Boolean existsByEndDateTime(String endDateTime);
}
