import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

/**
 * PRUEBA DE INTEGRACIÓN 5: Flujo Completo E2E - Simula compra de usuario
 * Verifica el flujo completo: cargar productos → agregar al carrito → modificar cantidades → checkout
 */
describe('Integration Test 5: Complete Shopping Flow (E2E Simulation)', () => {
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
    cartService.clearCart();
  });

  it('should complete a full shopping flow from browsing to checkout', () => {
    // PASO 1: Usuario navega y ve todos los productos
    const allProducts = productService.getAllProducts();
    expect(allProducts.length).toBe(6);

    // PASO 2: Usuario selecciona productos específicos
    const laptop = productService.getProductById(1); // $1299.99
    const smartphone = productService.getProductById(2); // $899.99
    const headphones = productService.getProductById(3); // $199.99

    // PASO 3: Usuario agrega productos al carrito
    if (laptop && smartphone && headphones) {
      cartService.addToCart(laptop);
      cartService.addToCart(smartphone);
      cartService.addToCart(headphones);
    }

    // Verificar que se agregaron
    let cartItems = cartService.getCartItems()();
    expect(cartItems.length).toBe(3);
    expect(cartService.getTotalItems()).toBe(3);

    // PASO 4: Usuario decide comprar 2 auriculares en lugar de 1
    if (headphones) {
      cartService.updateQuantity(headphones.id, 2);
    }

    // Verificar actualización
    cartItems = cartService.getCartItems()();
    expect(cartItems.find(item => item.product.id === 3)?.quantity).toBe(2);
    expect(cartService.getTotalItems()).toBe(4);

    // PASO 5: Usuario cambia de opinión y elimina el smartphone
    if (smartphone) {
      cartService.removeFromCart(smartphone.id);
    }

    // Verificar eliminación
    cartItems = cartService.getCartItems()();
    expect(cartItems.length).toBe(2);
    expect(cartItems.find(item => item.product.id === 2)).toBeUndefined();

    // PASO 6: Usuario revisa el total antes de comprar
    const expectedTotal = 1299.99 + (199.99 * 2); // Laptop + 2 auriculares
    expect(cartService.getTotalPrice()).toBe(expectedTotal);
    expect(cartService.getTotalItems()).toBe(3);

    // PASO 7: Usuario completa la compra (checkout)
    cartService.clearCart();

    // Verificar que el carrito está vacío después de la compra
    expect(cartService.getCartItems()().length).toBe(0);
    expect(cartService.getTotalPrice()).toBe(0);
    expect(cartService.getTotalItems()).toBe(0);
  });

  it('should handle adding same product multiple times during shopping', () => {
    // Simular usuario agregando el mismo producto varias veces
    const watch = productService.getProductById(6); // $299.99

    if (watch) {
      // Usuario agrega el reloj 3 veces (simulando clics múltiples)
      cartService.addToCart(watch);
      cartService.addToCart(watch);
      cartService.addToCart(watch);

      const cartItems = cartService.getCartItems()();
      
      // Debe consolidarse en un solo item con cantidad 3
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].quantity).toBe(3);
      expect(cartItems[0].product.name).toBe('Reloj Inteligente');
      expect(cartService.getTotalPrice()).toBe(299.99 * 3);
    }
  });

  it('should calculate correct totals with mixed quantities', () => {
    // Escenario: Usuario compra varios productos con diferentes cantidades
    const allProducts = productService.getAllProducts();

    // Agregar diferentes productos
    cartService.addToCart(allProducts[0]); // Laptop x1
    cartService.addToCart(allProducts[2]); // Auriculares x1
    cartService.addToCart(allProducts[4]); // Tablet x1

    // Cambiar cantidades
    cartService.updateQuantity(allProducts[0].id, 1); // Laptop: 1
    cartService.updateQuantity(allProducts[2].id, 3); // Auriculares: 3
    cartService.updateQuantity(allProducts[4].id, 2); // Tablet: 2

    // Calcular total esperado
    const expectedTotal = (1299.99 * 1) + (199.99 * 3) + (599.99 * 2);
    const expectedItems = 1 + 3 + 2;

    expect(cartService.getTotalPrice()).toBeCloseTo(expectedTotal, 2);
    expect(cartService.getTotalItems()).toBe(expectedItems);
  });
});
