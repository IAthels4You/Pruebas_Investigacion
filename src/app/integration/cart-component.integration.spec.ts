import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CartComponent } from '../pages/cart/cart.component';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

/**
 * PRUEBA DE INTEGRACIÓN 2: CartComponent + CartService + ProductService
 * Verifica que el componente del carrito interactúe correctamente con los servicios
 */
describe('Integration Test 2: CartComponent + Services', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        CartService,
        ProductService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should display products added through CartService', () => {
    // Agregar productos usando el servicio
    const products = productService.getAllProducts();
    cartService.addToCart(products[0]);
    cartService.addToCart(products[1]);

    // El componente debe reflejar los cambios
    fixture.detectChanges();
    
    expect(component.cartItems().length).toBe(2);
    expect(component.totalItems()).toBe(2);
  });

  it('should calculate total price correctly with multiple real products', () => {
    // Limpiar carrito
    cartService.clearCart();
    
    // Agregar productos específicos
    const laptop = productService.getProductById(1); // $1299.99
    const smartphone = productService.getProductById(2); // $899.99
    const headphones = productService.getProductById(3); // $199.99

    if (laptop && smartphone && headphones) {
      cartService.addToCart(laptop);
      cartService.addToCart(smartphone);
      cartService.addToCart(headphones);
      fixture.detectChanges();

      const expectedTotal = 1299.99 + 899.99 + 199.99;
      expect(component.totalPrice()).toBeCloseTo(expectedTotal, 2);
      expect(component.totalItems()).toBe(3);
    }
  });

  it('should update quantity through component and sync with CartService', () => {
    // Limpiar y agregar producto
    cartService.clearCart();
    const product = productService.getProductById(1);
    
    if (product) {
      cartService.addToCart(product);
      fixture.detectChanges();

      // Actualizar cantidad desde el componente
      component.updateQuantity(product.id, 5);
      fixture.detectChanges();

      // Verificar sincronización con el servicio
      const cartItems = cartService.getCartItems()();
      expect(cartItems[0].quantity).toBe(5);
      expect(component.totalItems()).toBe(5);
    }
  });
});
