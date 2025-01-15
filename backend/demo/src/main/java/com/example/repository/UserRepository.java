package com.example.repository;

import java.util.HashMap;
import java.util.Map;

import com.example.model.User;

public class UserRepository {
    private final Map<String, User> users = new HashMap<>();

    public boolean addUser(User user) {
        if (users.containsKey(user.getUsername())) return false;
        users.put(user.getUsername(), user);
        return true;
    }

    public User getUser(String username) {
        return users.get(username);
    }

    public boolean verifyUser(String username) {
        User user = users.get(username);
        if (user != null && !user.isVerified()) {
            user.setVerified(true);
            return true;
        }
        return false;
    }
}
