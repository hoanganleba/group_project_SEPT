package com.example.onlinebookingsystem.repository;

import com.example.onlinebookingsystem.model.Contact;
import org.springframework.data.repository.CrudRepository;

public interface ContactRepository extends CrudRepository<Contact, Long> {
}
