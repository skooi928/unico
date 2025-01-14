package com.example.servlets;

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.List;
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
                        break;
                    }
                }
                if (matchFound) {
                    // Return success + a "token" for localStorage
                    response.getWriter().write("{\"message\":\"User logged in\",\"token\":\"fake_jwt_token\"}");
                } else {
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"error\":\"Invalid email or password\"}");
                }
            }
        } else if (requestBody.contains("\"action\":\"register\"")) {
            // Registration logic (write to user.json or DB)
            response.getWriter().write("{\"message\":\"User registered successfully\"}");
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