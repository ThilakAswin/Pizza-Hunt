package com.wipro.pizza_hunt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin
public class PizzaHuntApplication {

	public static void main(String[] args) {
		SpringApplication.run(PizzaHuntApplication.class, args);
	}

}
