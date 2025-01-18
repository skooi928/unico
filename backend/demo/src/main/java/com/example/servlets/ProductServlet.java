package com.example.servlets;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.example.models.Product;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebServlet("/products/*")
public class ProductServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        setCorsHeaders(response);
        response.setContentType("application/json");
        ObjectMapper objectMapper = new ObjectMapper();

        String pathInfo = request.getPathInfo();
        System.out.println("pathInfo: " + pathInfo); // debug log
        if (pathInfo == null || pathInfo.equals("/")) {
            try (InputStream inputStream = getServletContext().getResourceAsStream("/WEB-INF/data/product.json")) {
                if (inputStream == null) {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    return;
                }

                List<Product> products = objectMapper.readValue(inputStream, objectMapper.getTypeFactory().constructCollectionType(List.class, Product.class));
                response.getWriter().write(objectMapper.writeValueAsString(products));
            } catch (IOException e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                e.printStackTrace();
            }
        } else {
            String id = pathInfo.substring(1);
            try (InputStream inputStream = getServletContext().getResourceAsStream("/WEB-INF/data/product.json")) {
                if (inputStream == null) {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    return;
                }

                List<Product> products = objectMapper.readValue(inputStream, objectMapper.getTypeFactory().constructCollectionType(List.class, Product.class));
                Optional<Product> product = products.stream().filter(p -> String.valueOf(p.getId()).equals(id)).findFirst();
                if (product.isPresent()) {
                    response.getWriter().write(objectMapper.writeValueAsString(product.get()));
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                }
            } catch (IOException e) {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                e.printStackTrace();
            }
        }
    }

    private void setCorsHeaders(HttpServletResponse response) {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Adjust the origin as needed
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
        response.setHeader("Access-Control-Allow-Credentials", "true");
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        setCorsHeaders(response);
        response.setStatus(HttpServletResponse.SC_OK);
    }
}