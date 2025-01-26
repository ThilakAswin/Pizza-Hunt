package com.wipro.pizza_hunt.repo;

import com.wipro.pizza_hunt.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByCustomerId(Long customerId); // Method to find by customer ID
}
