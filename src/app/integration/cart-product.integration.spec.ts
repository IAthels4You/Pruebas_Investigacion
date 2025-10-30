import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

/**
 * PRUEBA DE INTEGRACIÓN 1: CartService + ProductService
 * Verifica que el carrito funcione correctamente con productos reales del servicio
 */
describe('Integration Test 1: CartService + ProductService', () => {
  let cartService: CartService;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        CartService,
        ProductService
      ]
    });

    cartService = TestBed.inject(CartService);
    productService = TestBed.inject(ProductService);
  });

  it('should add real products from ProductService to cart and calculate total correctly', () => {
    // Obtener productos reales del servicio
    const products = productService.getAllProducts();
    const laptop = products[0]; // Laptop Gaming - $1299.99
    const smartphone = products[1]; // Smartphone Pro - $899.99

    // Agregar productos al carrito
    cartService.addToCart(laptop);
    cartService.addToCart(smartphone);

    // Verificar que se agregaron correctamente
    const cartItems = cartService.getCartItems()();
    expect(cartItems.length).toBe(2);
    expect(cartItems[0].product.name).toBe('Laptop Gaming');
    expect(cartItems[1].product.name).toBe('Smartphone Pro');

    // Verificar cálculo del total
    const expectedTotal = 1299.99 + 899.99;
    expect(cartService.getTotalPrice()).toBe(expectedTotal);
  });

  it('should update quantity and recalculate total correctly', () => {
    // Agregar producto
    const product = productService.getProductById(3); // Auriculares - $199.99
    if (product) {
      cartService.addToCart(product);
      
      // Actualizar cantidad a 3
      cartService.updateQuantity(product.id, 3);

      // Verificar cantidad actualizada
      const cartItems = cartService.getCartItems()();
      expect(cartItems[0].quantity).toBe(3);

      // Verificar nuevo total
      expect(cartService.getTotalPrice()).toBe(199.99 * 3);
    }
  });

  it('should handle adding same product multiple times and increase quantity', () => {
    const product = productService.getProductById(1);
    if (product) {
      // Agregar el mismo producto 3 veces
      cartService.addToCart(product);
      cartService.addToCart(product);
      cartService.addToCart(product);

      const cartItems = cartService.getCartItems()();
      
      // Debe haber solo 1 item pero con cantidad 3
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].quantity).toBe(3);
      expect(cartService.getTotalItems()).toBe(3);
    }
  });
});
