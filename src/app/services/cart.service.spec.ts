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
  });

  it('should add product to cart', () => {
    service.addToCart(mockProduct);
    expect(service.getCartItems()().length).toBe(1);
    expect(service.getCartItems()()[0].quantity).toBe(1);
  });

  it('should calculate total price correctly', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);
    const expectedTotal = mockProduct.price * 2;
    expect(service.getTotalPrice()).toBe(expectedTotal);
  });
});
