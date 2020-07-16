package com.example.onlinebookingsystem.controller;

import com.example.onlinebookingsystem.model.Contact;
import com.example.onlinebookingsystem.repository.ContactRepository;
import com.example.onlinebookingsystem.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactsController {

   private final ContactService contactService;

    @Autowired
    public ContactsController(ContactService contactService) {
        this.contactService = contactService;
    }

    @GetMapping("/contacts")
    public Iterable<Contact> contacts() {
        return contactService.getAllContacts();
    }
}
