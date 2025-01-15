package com.example.servlets;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import javax.mail.MessagingException;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;
import com.example.services.EmailService;
import com.google.gson.JsonObject;
import com.example.models.User;

@WebServlet("/user")
public class UserServlet extends HttpServlet {
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        setCorsHeaders(response);

        // 1) Read JSON body from request
        StringBuilder sb = new StringBuilder();
        try (BufferedReader reader = request.getReader()) {
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
        }
        String requestBody = sb.toString();

        // 2) Parse into a User object
        User incomingUser = gson.fromJson(requestBody, User.class);

        // 3) Check if "action" is login
        if (requestBody.contains("\"action\":\"login\"")) {
            // Read user.json from WEB-INF
            String path = getServletContext().getRealPath("/WEB-INF/data/user.json");
            try (Reader fileReader = new FileReader(path)) {
                Type userListType = new TypeToken<List<User>>() {
                }.getType();
                List<User> userList = gson.fromJson(fileReader, userListType);

                // 4) Compare credentials
                boolean matchFound = false;
                for (User user : userList) {
                    if (user.getEmail().equals(incomingUser.getEmail()) &&
                            user.getPassword().equals(incomingUser.getPassword())) {
                        matchFound = true;
                        // Create response with user data
                        JsonObject jsonResponse = new JsonObject();
                        jsonResponse.addProperty("message", "Valid token");
                        JsonObject userData = new JsonObject();
                        userData.addProperty("email", user.getEmail());
                        // Add other user fields as needed
                        userData.addProperty("address", user.getAddress());
                        jsonResponse.add("user", userData);
                        response.getWriter().write(jsonResponse.toString());
                        break;
                    }
                }
                if (!matchFound) {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"error\":\"Invalid email or password\"}");
                }
            }
        } else if (requestBody.contains("\"action\":\"register\"")) {
            // Add null check here
            if (incomingUser == null || incomingUser.getEmail() == null || incomingUser.getPassword() == null) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\":\"Invalid user data\"}");
                return;
            }

            try {
                String path = getServletContext().getRealPath("/WEB-INF/data/user.json");
                File directory = new File(path).getParentFile();
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                List<User> userList;
                File file = new File(path);

                if (!file.exists()) {
                    userList = new ArrayList<>();
                } else {
                    try (Reader fileReader = new FileReader(path)) {
                        Type userListType = new TypeToken<List<User>>() {
                        }.getType();
                        userList = gson.fromJson(fileReader, userListType);
                        if (userList == null) {
                            userList = new ArrayList<>();
                        }
                    }
                }

                // Check if email already exists
                boolean emailExists = userList.stream()
                        .anyMatch(user -> user.getEmail().equals(incomingUser.getEmail()));

                if (emailExists) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("{\"error\":\"Email already registered\"}");
                    return;
                }

                // Generate verification token
                String verificationToken = UUID.randomUUID().toString();
                incomingUser.setVerified(false);
                incomingUser.setVerificationToken(verificationToken);
                incomingUser.setTokenExpiry(System.currentTimeMillis() + 86400000);

                userList.add(incomingUser);

                // Write to file
                try (Writer writer = new FileWriter(path)) {
                    gson.toJson(userList, writer);
                    try {
                        EmailService emailService = new EmailService();
                        emailService.sendVerificationEmail(incomingUser.getEmail(), verificationToken);
                        response.getWriter().write("{\"message\":\"Please check your email to verify your account\"}");
                    } catch (MessagingException e) {
                        System.err.println("Email error: " + e.getMessage()); // Debug log
                        response.setStatus(HttpServletResponse.SC_OK); // Still created user
                        response.getWriter().write("{\"message\":\"Account created but verification email failed\"}");
                    }
                }
            } catch (Exception e) {
                System.err.println("Registration error: " + e.getMessage()); // Debug log
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
            }
        } else if (requestBody.contains("\"action\":\"verify\"")) {
            JsonObject jsonObject = gson.fromJson(requestBody, JsonObject.class);
            String token = jsonObject.get("verificationToken").getAsString();
            System.out.println("Received token from request: " + token); // Debug log

            String path = getServletContext().getRealPath("/WEB-INF/data/user.json");
            try (Reader fileReader = new FileReader(path)) {
                Type userListType = new TypeToken<List<User>>() {
                }.getType();
                List<User> userList = gson.fromJson(fileReader, userListType);
                System.out.println("Users in file: " + userList.size()); // Debug log

                boolean verified = false;
                for (User user : userList) {
                    System.out.println("User token: " + user.getVerificationToken()); // Debug log
                    if (user.getVerificationToken() != null &&
                            user.getVerificationToken().equals(token)) {
                        System.out.println("Token matched!"); // Debug log
                        user.setVerified(true);
                        user.setVerificationToken(null);
                        verified = true;
                        break;
                    }
                }

                if (verified) {
                    try (Writer writer = new FileWriter(path)) {
                        gson.toJson(userList, writer);
                        JsonObject jsonResponse = new JsonObject();
                        jsonResponse.addProperty("message", "Email verified successfully");

                        // Add user data to response
                        JsonObject userData = new JsonObject();
                        for (User user : userList) {
                            if (user.isVerified()) {
                                userData.addProperty("email", user.getEmail());
                                userData.addProperty("password", user.getPassword());
                                break;
                            }
                        }
                        jsonResponse.add("user", userData);

                        response.getWriter().write(jsonResponse.toString());
                    }
                } else {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("{\"error\":\"Invalid or expired verification token\"}");
                }
            }
        } else if (requestBody.contains("\"action\":\"update\"")) {
            // comment: user can adjust logic to decide which fields to update
            String path = getServletContext().getRealPath("/WEB-INF/data/user.json");
            try (Reader fileReader = new FileReader(path)) {
                Type userListType = new TypeToken<List<User>>() {}.getType();
                List<User> userList = gson.fromJson(fileReader, userListType);
        
                for (User user : userList) {
                    if (user.getEmail().equals(incomingUser.getEmail())) {
                        user.setAddress(incomingUser.getAddress());
                        // comment: add more fields to update here
                        break;
                    }
                }
                try (Writer writer = new FileWriter(path)) {
                    gson.toJson(userList, writer);
                }
                response.getWriter().write("{\"message\":\"Address updated.\"}");
            } catch (Exception e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("{\"error\":\"" + e.getMessage() + "\"}");
            }
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\":\"Unknown action\"}");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json;charset=UTF-8");
        setCorsHeaders(response);

        // Example token check
        if ("validate".equals(request.getParameter("action"))) {
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                // In practice, you’d verify the token
                response.getWriter().write("{\"message\":\"Valid token\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"error\":\"No or invalid token\"}");
            }
        }
    }

    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Adjust the origin as needed
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Email, Password");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}