import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductDetailComponent } from '../pages/product-detail/product-detail.component';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

/**
 * PRUEBA DE INTEGRACIÓN 3: ProductDetailComponent + Services + Router
 * Verifica la carga de productos desde la ruta y la integración con el carrito
 */
describe('Integration Test 3: ProductDetailComponent + Services + Router', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let cartService: CartService;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        CartService,
        ProductService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'id' ? '1' : null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should load product from ProductService using route parameter', () => {
    // El componente debe cargar el producto con id=1 desde la ruta
    expect(component.product).toBeDefined();
    expect(component.product?.id).toBe(1);
    expect(component.product?.name).toBe('Laptop Gaming');
  });

  it('should add product to cart and verify in CartService', (done) => {
    // Limpiar carrito primero
    cartService.clearCart();

    // Agregar producto desde el componente
    component.addToCart();
    
    // Usar setTimeout para permitir que se complete el ciclo de cambios
    setTimeout(() => {
      // Verificar que se agregó al servicio
      const cartItems = cartService.getCartItems()();
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].product.id).toBe(1);
      expect(cartItems[0].product.name).toBe('Laptop Gaming');
      done();
    }, 100);
  });

  it('should add multiple quantities of same product correctly', (done) => {
    cartService.clearCart();

    // Establecer cantidad a 3
    component.quantity = 3;

    // Agregar al carrito
    component.addToCart();
    
    // Usar setTimeout para permitir que se complete el ciclo de cambios
    setTimeout(() => {
      // Verificar cantidad en el carrito
      const cartItems = cartService.getCartItems()();
      expect(cartItems.length).toBe(1);
      expect(cartItems[0].quantity).toBe(3);
      expect(cartService.getTotalItems()).toBe(3);
      done();
    }, 100);
  });
});
