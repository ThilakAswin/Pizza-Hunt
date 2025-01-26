package com.wipro.pizza_hunt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.wipro.pizza_hunt.entity.Customer;
import com.wipro.pizza_hunt.repo.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    public Customer signup(Customer customer) {
        // Encode the password before saving
        customer.setPassword(passwordEncoder.encode(customer.getPassword())); // Hash the password
        return customerRepository.save(customer);
    }

    public Customer login(String email, String password) {
        try {
            Customer customer = customerRepository.findByEmail(email);
            if (customer != null && passwordEncoder.matches(password, customer.getPassword())) { // Use matches method
                return customer; // Return customer if password matches
            }
        } catch (Exception e) {
            System.out.println("Error during login: " + e.getMessage());
        }
        return null; // Invalid credentials
    }
}

