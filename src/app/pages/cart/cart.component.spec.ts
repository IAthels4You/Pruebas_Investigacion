import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    image: 'test.jpg',
    category: 'Test'
  };

  const mockProduct2: Product = {
    id: 2,
    name: 'Test Product 2',
    description: 'Test Description 2',
    price: 149.99,
    image: 'test2.jpg',
    category: 'Test'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartComponent],
      providers: [
        CartService,
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display empty cart initially', () => {
    expect(component.cartItems().length).toBe(0);
    expect(component.totalItems()).toBe(0);
    expect(component.totalPrice()).toBe(0);
  });

  it('should display cart items when products are added', () => {
    cartService.addToCart(mockProduct);
    fixture.detectChanges();
    expect(component.cartItems().length).toBe(1);
  });

  it('should calculate total items correctly', () => {
    cartService.addToCart(mockProduct);
    cartService.addToCart(mockProduct);
    cartService.addToCart(mockProduct2);
    fixture.detectChanges();
    expect(component.totalItems()).toBe(3);
  });

  it('should calculate total price correctly', () => {
    cartService.addToCart(mockProduct);
    cartService.addToCart(mockProduct2);
    fixture.detectChanges();
    const expectedTotal = mockProduct.price + mockProduct2.price;
    expect(component.totalPrice()).toBe(expectedTotal);
  });

  it('should update quantity', () => {
    cartService.addToCart(mockProduct);
    component.updateQuantity(mockProduct.id, 5);
    fixture.detectChanges();
    expect(component.cartItems()[0].quantity).toBe(5);
  });

  it('should remove product from cart', () => {
    cartService.addToCart(mockProduct);
    cartService.addToCart(mockProduct2);
    component.removeFromCart(mockProduct.id);
    fixture.detectChanges();
    expect(component.cartItems().length).toBe(1);
    expect(component.cartItems()[0].product.id).toBe(mockProduct2.id);
  });

  it('should clear cart on checkout', () => {
    spyOn(window, 'alert');
    cartService.addToCart(mockProduct);
    cartService.addToCart(mockProduct2);
    component.checkout();
    fixture.detectChanges();
    expect(component.cartItems().length).toBe(0);
    expect(window.alert).toHaveBeenCalled();
  });

  it('should display checkout button when cart has items', () => {
    cartService.addToCart(mockProduct);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Total');
  });
});
