package com.example.models;

public class User {
    private String email = "";
    private String password = "";
    private String address = "";
    private boolean verified = false;
    private String verificationToken = null;
    private long tokenExpiry = 0;

    public User() {
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public boolean isVerified() {
        return verified;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }

    public String getVerificationToken() {
        return verificationToken;
    }

    public void setVerificationToken(String verificationToken) {
        this.verificationToken = verificationToken;
    }

    public long getTokenExpiry() {
        return tokenExpiry;
    }

    public void setTokenExpiry(long tokenExpiry) {
        this.tokenExpiry = tokenExpiry;
    }
}