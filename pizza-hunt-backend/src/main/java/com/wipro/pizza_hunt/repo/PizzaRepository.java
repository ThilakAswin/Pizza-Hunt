package com.wipro.pizza_hunt.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.wipro.pizza_hunt.entity.Pizza;

@Repository
public interface PizzaRepository extends JpaRepository<Pizza, Long> {}