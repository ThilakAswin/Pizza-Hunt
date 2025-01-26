import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PizzaService } from '../../services/pizza.service';
import { CartService } from '../../services/cart.service';
import { Pizza } from '../../models/pizza.model';
import { Cart } from '../../models/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, HttpClientModule],
  providers: [PizzaService, CartService]
})
export class HomeComponent implements OnInit {
  pizzas: Pizza[] = [];
  filteredPizzas: Pizza[] = [];
  pizzaQuantities: { [key: number]: number } = {};
  userName: string | null = null;

  constructor(private pizzaService: PizzaService, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // Fetch pizzas from the service
    this.pizzaService.getAllPizzas().subscribe(
      (data: Pizza[]) => {
        this.pizzas = data;
        this.filteredPizzas = data;
      },
      error => {
        console.error('Error fetching pizzas:', error);
      }
    );

    // Check if user is logged in and retrieve the user's name
    const user = sessionStorage.getItem('user');
    if (user) {
      const userObject = JSON.parse(user);
      this.userName = userObject.name;
    }
  }

  applyFilters(name: string, type: string, price: string): void {
    const maxPrice = price ? parseFloat(price) : null;
    this.filteredPizzas = this.pizzas.filter(pizza => {
      return (
        (!name || pizza.name.toLowerCase().includes(name.toLowerCase())) &&
        (!type || pizza.type === type) &&
        (maxPrice === null || pizza.price <= maxPrice)
      );
    });
  }

  clearFilters(nameInput: HTMLInputElement, typeInput: HTMLSelectElement, priceInput: HTMLInputElement): void {
    nameInput.value = '';
    typeInput.value = '';
    priceInput.value = '';
    this.filteredPizzas = this.pizzas;
  }

  incrementQuantity(pizza: Pizza): void {
    this.pizzaQuantities[pizza.id] = (this.pizzaQuantities[pizza.id] || 0) + 1;
  }

  decrementQuantity(pizza: Pizza): void {
    if ((this.pizzaQuantities[pizza.id] || 0) > 0) {
      this.pizzaQuantities[pizza.id]--;
    }
  }

  buyPizza(pizza: Pizza): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      const customerId = JSON.parse(user).id;
      const cartItem: Cart = {
        customerId,
        pizza: { id: pizza.id },
        quantity: 1 // Set default quantity to 1
      };
  
      this.cartService.addToCart(cartItem).subscribe(
        response => {
          alert(`You have ordered: 1 x ${pizza.name}`);
        },
        error => {
          console.error('Error adding to cart:', error);
          alert('Failed to add pizza to cart. Please try again.');
        }
      );
    } else {
      alert('You need to log in first.');
      this.router.navigate(['/login']);
    }
  }
  
}
