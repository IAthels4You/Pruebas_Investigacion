import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items = signal<CartItem[]>([]);

  getCartItems() {
    return this.items;
  }

  addToCart(product: Product) {
    const currentItems = this.items();
    const existingItem = currentItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
      this.items.set([...currentItems]);
    } else {
      this.items.set([...currentItems, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: number) {
    const currentItems = this.items();
    this.items.set(currentItems.filter(item => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    const currentItems = this.items();
    const item = currentItems.find(item => item.product.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.items.set([...currentItems]);
      }
    }
  }

  getTotalItems() {
    return this.items().reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  clearCart() {
    this.items.set([]);
  }
}

