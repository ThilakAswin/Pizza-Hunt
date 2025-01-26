import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../../models/cart-item.model'; // Adjust the path as needed
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'] // Add CSS file here
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = []; // Initialize as an empty array
  isLoading = true; // Add a loading state
  couponCode: string = ''; // To store the entered coupon code
  discount: number = 0; // To store the discount amount
  isOrderConfirmed = false; // State for order confirmation
  orderId: string = ''; // To store generated order ID
  customerAddress: string = ''; // To store customer address

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadCartItems();
  }


  loadCartItems() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}'); // Retrieve user from session storage
    const customerId = user.id; // Get the customer's ID from the user object

    if (customerId) {
      const apiUrl = `http://localhost:8080/api/cart/customer/${customerId}`;

      this.http.get<CartItem[]>(apiUrl)
        .subscribe({
          next: (data) => {
            this.cartItems = data; // Set the cart items to the response data
            this.isLoading = false; // Set loading to false after data is fetched
          },
          error: (err) => {
            console.error('Error fetching cart items:', err);
            this.cartItems = []; // Ensure cartItems is reset in case of an error
            this.isLoading = false; // Set loading to false in case of error
          }
        });
    } else {
      console.error('No customer ID found in session storage.');
      this.isLoading = false; // Set loading to false if no ID is found
    }
  }

  getTotalPrice(item: CartItem): number {
    return item.pizza.price * item.quantity; // Calculate total price for the item
  }

  getTotalCartPrice(): number {
    return this.cartItems.reduce((total, item) => total + this.getTotalPrice(item), 0); // Calculate total price for the cart
  }

  incrementQuantity(item: CartItem): void {
    item.quantity++; // Increment quantity
  }

  decrementQuantity(item: CartItem): void {
    if (item.quantity > 1) { // Ensure quantity does not go below 1
      item.quantity--;
    }
  }

  updateQuantity(item: CartItem, event: any): void {
    const newQuantity = event.target.value;
    if (newQuantity >= 0) {
      item.quantity = newQuantity; // Update quantity if valid
    }
  }

  onCouponCodeInput(event: any): void {
    this.couponCode = event.target.value; // Update coupon code
  }

  

  availableCoupons: string[] = ['save100', 'freeship', 'summer200', 'welcome150', 'buy1get1'];
  couponError: string = ''; // To store any coupon-related errors

applyCoupon() {
  const couponDiscounts: { [key: string]: number } = {
    'save100': 100,
    'freeship': 50,
    'summer200': 200,
    'welcome150': 150,
    'buy1get1': 50
  };

  const lowerCaseCouponCode = this.couponCode.toLowerCase();
  const discountValue = couponDiscounts[lowerCaseCouponCode] || 0;

  if (this.getTotalCartPrice() - discountValue < 0) {
    this.couponError = 'Coupon is not valid as the discount exceeds the total price.';
    this.discount = 0;
  } else {
    this.discount = discountValue;
    this.couponError = '';
  }

  this.couponCode = '';
}

selectCoupon(coupon: string) {
  this.couponCode = coupon; // Automatically set the coupon code when clicked
}

  
  

  getFinalCartPrice(): number {
    return this.getTotalCartPrice() - this.discount; // Calculate final price after discount
  }

  placeOrder() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}'); // Retrieve user from session storage
    const customerId = user.id; // Get the customer's ID from the user object

    if (customerId) {
        const apiUrl = `http://localhost:8080/api/cart/customer/${customerId}/clear`; // URL to clear the cart
        this.http.delete(apiUrl).subscribe({
            next: () => {
                console.log('Cart cleared successfully.'); // Log success
            },
            error: (err) => {
                console.error('Error clearing cart:', err); // Log error
            }
        });
    }

    // Generate a random order ID for demonstration
    this.orderId = `ORD-${Math.floor(Math.random() * 10000)}`; // Random order ID
    
    // Retrieve the customer address from session storage
    this.customerAddress = user.address || "Address not found"; // Use the address from user object
  
    this.isOrderConfirmed = true; // Set order confirmation state
}

closeOrderConfirmation(): void {
  this.isOrderConfirmed = false; // Close order confirmation
  this.router.navigate(['/']); // Navigate to the home page after closing confirmation
}


  removePizzaFromCart(item: CartItem): void {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}'); // Retrieve user from session storage
    const customerId = user.id; // Get the customer's ID from the user object

    if (customerId) {
      const apiUrl = `http://localhost:8080/api/cart/customer/${customerId}/pizza/${item.pizza.id}`; // URL to remove pizza from cart

      this.http.delete(apiUrl)
        .subscribe({
          next: () => {
            this.cartItems = this.cartItems.filter(cartItem => cartItem.pizza.id !== item.pizza.id); // Update cart items
            alert('Pizza removed from cart'); // Alert for successful removal
          },
          error: (err) => {
            console.error('Error removing pizza from cart:', err); // Log error
            alert('Failed to remove pizza from cart'); // Alert for failure
          }
        });
    } else {
      console.error('No customer ID found in session storage.');
    }
  }
}
