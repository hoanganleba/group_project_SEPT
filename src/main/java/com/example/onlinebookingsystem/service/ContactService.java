package com.example.onlinebookingsystem.service;

import com.example.onlinebookingsystem.model.Contact;
import com.example.onlinebookingsystem.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ContactService {
    private final ContactRepository contactRepository;

    @Autowired
    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> getAllContacts() {
        Iterable<Contact> contacts = this.contactRepository.findAll();
        List<Contact> contactList = new ArrayList<>();
        contacts.forEach(contactList::add);
        return contactList;
    }
}
