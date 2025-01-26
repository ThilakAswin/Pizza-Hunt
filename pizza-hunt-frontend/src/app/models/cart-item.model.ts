// src/app/models/cart-item.model.ts

export interface Pizza {
    id: number;
    name: string;
    price: number;
  }
  
  export interface CartItem {
    id: number;
    customerId: number;
    pizza: Pizza;
    quantity: number;
  }
  