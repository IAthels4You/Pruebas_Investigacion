import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  private cartService = inject(CartService);
  
  cartItems = this.cartService.getCartItems();
  totalItems = computed(() => this.cartService.getTotalItems());
  totalPrice = computed(() => this.cartService.getTotalPrice());

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  checkout() {
    alert('¡Gracias por tu compra! En una tienda real, esto procesaría el pago.');
    this.cartService.clearCart();
  }
}

