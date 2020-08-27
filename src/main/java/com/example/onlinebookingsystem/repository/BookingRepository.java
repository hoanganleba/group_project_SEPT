package com.example.onlinebookingsystem.repository;

import com.example.onlinebookingsystem.model.Booking;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface BookingRepository extends CrudRepository<Booking, Integer> {
    Iterable<Booking> findByCustomerId(Integer customerId);
}
