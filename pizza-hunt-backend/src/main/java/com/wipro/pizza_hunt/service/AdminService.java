package com.wipro.pizza_hunt.service;

import com.wipro.pizza_hunt.entity.Admin;
import com.wipro.pizza_hunt.repo.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    // Method to add a new admin
    public Admin addAdmin(Admin admin) {
        // Check if the email already exists
        Optional<Admin> existingAdmin = adminRepository.findByEmail(admin.getEmail());
        if (existingAdmin.isPresent()) {
            return null; // Email already exists
        }
        return adminRepository.save(admin);
    }

    // Method to get all admins
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    // Method to get a single admin by id
    public Admin getAdminById(Long id) {
        return adminRepository.findById(id).orElse(null);
    }
    
    public Admin loginAdmin(String email, String password) {
        Optional<Admin> adminOptional = adminRepository.findByEmail(email);
        if (adminOptional.isPresent() && adminOptional.get().getPassword().equals(password)) {
            return adminOptional.get();
        }
        return null;
    }
}
