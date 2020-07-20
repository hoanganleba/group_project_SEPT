package com.example.onlinebookingsystem.service;

import com.example.onlinebookingsystem.model.User;
import com.example.onlinebookingsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    public final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        Iterable<User> users = this.userRepository.findAll();
        List<User> userList = new ArrayList<>();
        users.forEach(userList::add);
        return userList;
    }
}
