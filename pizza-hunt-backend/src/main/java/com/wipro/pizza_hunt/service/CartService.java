package com.wipro.pizza_hunt.service;

import com.wipro.pizza_hunt.entity.Cart;
import com.wipro.pizza_hunt.repo.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    // Add a new item to the cart
    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    // Get cart items by customer ID
    public List<Cart> getCartItemsByCustomerId(Long customerId) {
        return cartRepository.findByCustomerId(customerId);
    }

    // Get all cart items (for admin or testing)
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    // Clear the cart items for a specific customer ID
    public void clearCartByCustomerId(Long customerId) {
        List<Cart> itemsToClear = cartRepository.findByCustomerId(customerId); // Get all items for that customer
        cartRepository.deleteAll(itemsToClear); // Delete the items
        
        
    }
    public void removePizzaFromCart(Long customerId, Long pizzaId) {
        List<Cart> cartItems = cartRepository.findByCustomerId(customerId); // Get the customer's cart items
        for (Cart cart : cartItems) {
            if (cart.getPizza().getId().equals(pizzaId)) { // Check if the pizza ID matches
                cartRepository.delete(cart); // Delete the matching cart item
                break; // Exit the loop once the pizza is found and removed
            }
        }
    }
    
 // Clear the cart items for a specific customer ID


}
