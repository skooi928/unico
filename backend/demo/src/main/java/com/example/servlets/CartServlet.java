package com.example.servlets;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;

import com.example.models.Cart;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {
    private Gson gson = new Gson();

    // Add CORS headers
    private void addCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    // Load all cart items from JSON
    private List<Cart> loadCartItems(String path) throws IOException {
        File file = new File(path);
        if (!file.exists()) {
            return new ArrayList<>();
        }
        try (Reader reader = new FileReader(file)) {
            List<Cart> cartItems = gson.fromJson(reader, new TypeToken<List<Cart>>() {}.getType());
            return cartItems != null ? cartItems : new ArrayList<>();
        }
    }

    // Save updated cart items to JSON
    private void saveCartItems(String path, List<Cart> cartItems) throws IOException {
        try (Writer writer = new FileWriter(path)) {
            gson.toJson(cartItems, writer);
        }
    }

    // GET to retrieve all cart items
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        addCorsHeaders(response);
        String realPath = getServletContext().getRealPath("/WEB-INF/data/cart.json");
        List<Cart> cartItems = loadCartItems(realPath);

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(cartItems));
    }

    // POST to add a new cart item
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        addCorsHeaders(response);
        String realPath = getServletContext().getRealPath("/WEB-INF/data/cart.json");
        List<Cart> cartItems = loadCartItems(realPath);

        // Ensure cartItems is not null
        if (cartItems == null) {
            cartItems = new ArrayList<>();
        }

        // parse incoming JSON
        BufferedReader reader = request.getReader();
        Cart newItem = gson.fromJson(reader, Cart.class);

        // check if item exists, else add
        boolean found = false;
        for (Cart item : cartItems) {
            if (item.getId() == newItem.getId() &&
                item.getSize().equals(newItem.getSize()) &&
                item.getColor().equals(newItem.getColor())) {
                item.setQuantity(item.getQuantity() + 1);
                found = true;
                break;
            }
        }
        if (!found) {
            newItem.setQuantity(1);
            cartItems.add(newItem);
        }

        // save to cart.json
        saveCartItems(realPath, cartItems);

        response.setContentType("application/json");
        response.getWriter().write("{\"message\": \"Item added to cart\"}");
    }

    // Handle OPTIONS preflight request
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        addCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}