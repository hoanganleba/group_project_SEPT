package com.example.onlinebookingsystem.seeder;

import com.example.onlinebookingsystem.model.Contact;
import com.example.onlinebookingsystem.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ContactSeeder implements CommandLineRunner {
    private final ContactRepository contactRepository;

    @Autowired
    public ContactSeeder(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    @Override
    public void run(String... strings) throws Exception {
        this.contactRepository.save(new Contact("An", "Le", "s3681410@rmit.edu.vn"));
        this.contactRepository.save(new Contact("Hello", "World", "helloworld@something"));
    }
}
