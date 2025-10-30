import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with empty cart', () => {
    expect(service.getCartItems()()).toEqual([]);
    expect(service.getTotalItems()).toBe(0);
    expect(service.getTotalPrice()).toBe(0);
  });

  it('should add product to cart', () => {
    service.addToCart(mockProduct);
    expect(service.getCartItems()().length).toBe(1);
    expect(service.getCartItems()()[0].product).toEqual(mockProduct);
    expect(service.getCartItems()()[0].quantity).toBe(1);
  });

  it('should increase quantity when adding same product', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);
    expect(service.getCartItems()().length).toBe(1);
    expect(service.getCartItems()()[0].quantity).toBe(2);
  });

  it('should add multiple different products', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct2);
    expect(service.getCartItems()().length).toBe(2);
  });

  it('should remove product from cart', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct2);
    service.removeFromCart(mockProduct.id);
    expect(service.getCartItems()().length).toBe(1);
    expect(service.getCartItems()()[0].product.id).toBe(mockProduct2.id);
  });

  it('should update product quantity', () => {
    service.addToCart(mockProduct);
    service.updateQuantity(mockProduct.id, 5);
    expect(service.getCartItems()()[0].quantity).toBe(5);
  });

  it('should remove product when quantity is 0 or less', () => {
    service.addToCart(mockProduct);
    service.updateQuantity(mockProduct.id, 0);
    expect(service.getCartItems()().length).toBe(0);
  });

  it('should calculate total items correctly', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);
    service.addToCart(mockProduct2);
    expect(service.getTotalItems()).toBe(3);
  });

  it('should calculate total price correctly', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);
    service.addToCart(mockProduct2);
    const expectedTotal = (mockProduct.price * 2) + mockProduct2.price;
    expect(service.getTotalPrice()).toBe(expectedTotal);
  });

  it('should clear cart', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct2);
    service.clearCart();
    expect(service.getCartItems()().length).toBe(0);
    expect(service.getTotalItems()).toBe(0);
    expect(service.getTotalPrice()).toBe(0);
  });
});
