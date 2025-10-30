import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all products', () => {
    const products = service.getAllProducts();
    expect(products).toBeTruthy();
    expect(products.length).toBeGreaterThan(0);
  });

  it('should return correct number of products', () => {
    const products = service.getAllProducts();
    expect(products.length).toBe(6);
  });

  it('should have valid product structure', () => {
    const products = service.getAllProducts();
    products.forEach((product: Product) => {
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.description).toBeDefined();
      expect(product.price).toBeDefined();
      expect(product.image).toBeDefined();
      expect(product.category).toBeDefined();
      expect(typeof product.price).toBe('number');
    });
  });

  it('should get product by id', () => {
    const product = service.getProductById(1);
    expect(product).toBeTruthy();
    expect(product?.id).toBe(1);
    expect(product?.name).toBe('Laptop Gaming');
  });

  it('should return undefined for non-existent product id', () => {
    const product = service.getProductById(999);
    expect(product).toBeUndefined();
  });

  it('should get products by category', () => {
    const products = service.getProductsByCategory('Electrónica');
    expect(products.length).toBeGreaterThan(0);
    products.forEach((product: Product) => {
      expect(product.category).toBe('Electrónica');
    });
  });

  it('should return empty array for non-existent category', () => {
    const products = service.getProductsByCategory('NonExistent');
    expect(products).toEqual([]);
  });

  it('should have unique product ids', () => {
    const products = service.getAllProducts();
    const ids = products.map((p: Product) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});
