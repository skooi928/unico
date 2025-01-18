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
import com.example.models.Product;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {
    final private Gson gson = new Gson();

    // Add CORS headers
    private void addCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PUT");
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

    // Update product stock after adding to cart or deleting from cart
    private void updateProductStock(int productId, String size, String color, int quantity) throws IOException {
        String productPath = getServletContext().getRealPath("/WEB-INF/data/product.json");
        ObjectMapper mapper = new ObjectMapper();
        List<Product> products = mapper.readValue(new File(productPath),
                mapper.getTypeFactory().constructCollectionType(List.class, Product.class));

        for (Product product : products) {
            if (product.getId() == productId) {
                int sizeIndex = product.getSize().indexOf(size);
                int colorIndex = product.getColor().indexOf(color);
                // Calculate stock index based on size and color
                // For each size, increment through all colors first
                int stockIndex = colorIndex + (sizeIndex * product.getColor().size());

                List<Integer> stockList = product.getStock();
                int currentStock = stockList.get(stockIndex);
                // Ensure stock doesn't go below 0
                int newStock = Math.max(0, currentStock - quantity);
                stockList.set(stockIndex, newStock);
                break;
            }
        }

        mapper.writeValue(new File(productPath), products);
    }

    // GET to retrieve all cart items for a specific user
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        addCorsHeaders(response);
        String realPath = getServletContext().getRealPath("/WEB-INF/data/cart.json");
        String productPath = getServletContext().getRealPath("/WEB-INF/data/product.json");
        List<Cart> cartItems = loadCartItems(realPath);

        // Load products to check stock
        ObjectMapper mapper = new ObjectMapper();
        List<Product> products = mapper.readValue(new File(productPath),
                mapper.getTypeFactory().constructCollectionType(List.class, Product.class));

        String userEmail = request.getParameter("userEmail");
        List<Cart> userCartItems = new ArrayList<>();
        boolean needsSaving = false;

        for (Cart item : cartItems) {
            if (item.getUserEmail().equals(userEmail)) {
                // Find corresponding product and check stock
                for (Product product : products) {
                    if (product.getId() == item.getId()) {
                        int sizeIndex = product.getSize().indexOf(item.getSize());
                        int colorIndex = product.getColor().indexOf(item.getColor());
                        int stockIndex = colorIndex + (sizeIndex * product.getColor().size());

                        int availableStock = product.getStock().get(stockIndex);
                        if (availableStock < item.getQuantity()) {
                            // Update quantity if stock is insufficient
                            item.setQuantity(availableStock);
                            needsSaving = true;
                        }
                        // Only add item if stock > 0
                        if (availableStock > 0) {
                            userCartItems.add(item);
                        } else {
                            needsSaving = true; // Remove item if stock is 0
                        }
                        break;
                    }
                }
            }
        }

        // Save updated cart if quantities were adjusted
        if (needsSaving) {
            saveCartItems(realPath, cartItems);
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
                item.setQuantity(item.getQuantity() + newItem.getQuantity()); // Update quantity
                found = true;
                updateProductStock(item.getId(), item.getSize(), item.getColor(), newItem.getQuantity());
                break;
            }
        }
        if (!found) {
            cartItems.add(newItem);
            updateProductStock(newItem.getId(), newItem.getSize(), newItem.getColor(), newItem.getQuantity());
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

        BufferedReader reader = request.getReader();
        Cart itemToRemove = gson.fromJson(reader, Cart.class);

        for (Cart item : cartItems) {
            if (item.getId() == itemToRemove.getId() &&
                    item.getSize().equals(itemToRemove.getSize()) &&
                    item.getColor().equals(itemToRemove.getColor()) &&
                    item.getUserEmail().equals(itemToRemove.getUserEmail())) {
                // Restore stock when removing item
                updateProductStock(item.getId(), item.getSize(), item.getColor(), -item.getQuantity());
                break;
            }
        }

        cartItems.removeIf(item -> item.getId() == itemToRemove.getId() &&
                item.getSize().equals(itemToRemove.getSize()) &&
                item.getColor().equals(itemToRemove.getColor()) &&
                item.getUserEmail().equals(itemToRemove.getUserEmail()));

        saveCartItems(realPath, cartItems);
        response.setContentType("application/json");
        response.getWriter().write("{\"message\": \"Item removed from cart\"}");
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        addCorsHeaders(response);
        String realPath = getServletContext().getRealPath("/WEB-INF/data/cart.json");
        List<Cart> cartItems = loadCartItems(realPath);

        BufferedReader reader = request.getReader();
        String userEmail = gson.fromJson(reader, String.class);

        // Remove all items for this user without restoring stock
        cartItems.removeIf(item -> item.getUserEmail().equals(userEmail));

        saveCartItems(realPath, cartItems);
        response.setContentType("application/json");
        response.getWriter().write("{\"message\": \"Cart cleared after payment\"}");
    }

    // Handle OPTIONS preflight request
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        addCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}