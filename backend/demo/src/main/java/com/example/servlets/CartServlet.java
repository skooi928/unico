package com.example.servlets;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.models.Cart;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {
    final private Gson gson = new Gson();

    // Add CORS headers
    private void addCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    }

    // Load all cart items from JSON
    private List<Cart> loadCartItems(String path) throws IOException {
        File file = new File(path);
        if (!file.exists()) {
            return new ArrayList<>();
        }
        try (Reader reader = new FileReader(file)) {
            List<Cart> cartItems = gson.fromJson(reader, new TypeToken<List<Cart>>() {
            }.getType());
            return cartItems != null ? cartItems : new ArrayList<>();
        }
    }

    // Save updated cart items to JSON
    private void saveCartItems(String path, List<Cart> cartItems) throws IOException {
        try (Writer writer = new FileWriter(path)) {
            gson.toJson(cartItems, writer);
        }
    }

    // GET to retrieve all cart items for a specific user
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        addCorsHeaders(response);
        String realPath = getServletContext().getRealPath("/WEB-INF/data/cart.json");
        List<Cart> cartItems = loadCartItems(realPath);

        String userEmail = request.getParameter("userEmail");
        List<Cart> userCartItems = new ArrayList<>();
        for (Cart item : cartItems) {
            if (item.getUserEmail().equals(userEmail)) {
                userCartItems.add(item);
            }
        }

        response.setContentType("application/json");
        response.getWriter().write(gson.toJson(userCartItems));
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
                    item.getColor().equals(newItem.getColor()) &&
                    item.getUserEmail().equals(newItem.getUserEmail())) { // Check userEmail
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

    // DELETE to remove a cart item
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        addCorsHeaders(response);
        String realPath = getServletContext().getRealPath("/WEB-INF/data/cart.json");
        List<Cart> cartItems = loadCartItems(realPath);

        // parse incoming JSON
        BufferedReader reader = request.getReader();
        Cart itemToRemove = gson.fromJson(reader, Cart.class);

        // remove item from cart
        cartItems.removeIf(item -> item.getId() == itemToRemove.getId() &&
                item.getSize().equals(itemToRemove.getSize()) &&
                item.getColor().equals(itemToRemove.getColor()) &&
                item.getUserEmail().equals(itemToRemove.getUserEmail())); // Check userEmail

        // save to cart.json
        saveCartItems(realPath, cartItems);

        response.setContentType("application/json");
        response.getWriter().write("{\"message\": \"Item removed from cart\"}");
    }

    // Handle OPTIONS preflight request
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        addCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}