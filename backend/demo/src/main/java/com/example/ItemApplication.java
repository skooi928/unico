package com.example.itemfilter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.List;
import org.springframework.stereotype.Service;


@SpringBootApplication
public class ItemApplication {
    public static void main(String[] args) {
        SpringApplication.run(ItemApplication.class, args);
    }
}

// Item Entity Class
@Entity
class Item {
    @Id
    private Long id;
    private String name;
    private String gender; // "Men", "Women", or "Kid"
    private double price;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}

// Repository Interface
interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByGenderAndPriceBetween(String gender, double minPrice, double maxPrice);
}

// Service Class
@Service
class ItemService {

    @Autowired
    private ItemRepository itemRepository;

    public List<Item> filterItems(String gender, double minPrice, double maxPrice) {
        return itemRepository.findByGenderAndPriceBetween(gender, minPrice, maxPrice);
    }
}

// Controller Class
@RestController
@RequestMapping("/api/items")
class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/filter")
    public List<Item> getFilteredItems(
            @RequestParam String gender,
            @RequestParam double minPrice,
            @RequestParam double maxPrice) {
        return itemService.filterItems(gender, minPrice, maxPrice);
    }
}

