package com.wipro.pizza_hunt.controller;

import com.wipro.pizza_hunt.entity.Cart;
import com.wipro.pizza_hunt.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Add a new item to the cart
    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody Cart cart) {
        Cart savedCart = cartService.addToCart(cart);
        return ResponseEntity.ok(savedCart);
    }

    // Get cart by customer ID
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Cart>> getCartItemsByCustomerId(@PathVariable Long customerId) {
        List<Cart> cartItems = cartService.getCartItemsByCustomerId(customerId);
        return ResponseEntity.ok(cartItems);
    }

    // Get all cart items (admin or debugging purposes)
    @GetMapping("/all")
    public ResponseEntity<List<Cart>> getAllCarts() {
        List<Cart> cartItems = cartService.getAllCarts();
        return ResponseEntity.ok(cartItems);
    }

    // Clear the cart for a specific customer ID
    @DeleteMapping("/customer/{customerId}/clear")
    public ResponseEntity<Void> clearCart(@PathVariable Long customerId) {
        cartService.clearCartByCustomerId(customerId); // Call the service method to clear the cart
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // Return HTTP 204 No Content
    }
    

    // Remove a specific pizza from the cart
    @DeleteMapping("/customer/{customerId}/pizza/{pizzaId}")
    public ResponseEntity<Void> removePizzaFromCart(
            @PathVariable Long customerId,
            @PathVariable Long pizzaId) {
        cartService.removePizzaFromCart(customerId, pizzaId); // Call the service method to remove the pizza
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build(); // Return HTTP 204 No Content
    }
}
