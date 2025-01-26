// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartUrl = 'http://localhost:8080/api/cart'; // Adjust as needed for your backend

  constructor(private http: HttpClient) {}

  // Add a pizza to the cart
  addToCart(cartItem: Cart): Observable<Cart> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Cart>(`${this.cartUrl}/add`, cartItem, { headers });
  }
}
