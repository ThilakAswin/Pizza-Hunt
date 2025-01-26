// src/app/models/cart.model.ts
export interface Cart {
    id?: number;
    customerId: number;
    pizza: { id: number }; // Pizza only needs its ID
    quantity: number;
  }
  