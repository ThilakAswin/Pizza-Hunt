package com.wipro.pizza_hunt.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wipro.pizza_hunt.entity.Pizza;
import com.wipro.pizza_hunt.exception.ResourceNotFoundException;
import com.wipro.pizza_hunt.repo.PizzaRepository;

@Service
public class PizzaService {

    @Autowired
    private PizzaRepository pizzaRepository;

    public List<Pizza> getAllPizzas() {
        return pizzaRepository.findAll();
    }

    public Pizza addPizza(Pizza pizza) {
        return pizzaRepository.save(pizza);
    }

    public Pizza updatePizza(Long id, Pizza pizza) {
        Pizza existingPizza = pizzaRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Pizza not found"));
        existingPizza.setName(pizza.getName());
        existingPizza.setPrice(pizza.getPrice());
        // Update other fields
        return pizzaRepository.save(existingPizza);
    }

    public void deletePizza(Long id) {
        pizzaRepository.deleteById(id);
    }
    
    public Optional<Pizza> getPizzaById(Long id) {
        return pizzaRepository.findById(id); // Adjust as necessary based on your ID type
    }
}
