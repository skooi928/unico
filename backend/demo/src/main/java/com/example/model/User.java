package com.example.model;

public class User {
    private String username;
    private String email;
    private String password;
    private boolean isVerified;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.isVerified = false;
    }

    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
    public boolean isVerified() { return isVerified; }

    public void setVerified(boolean verified) { isVerified = verified; }
}
