import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ProductService } from './product.service';

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
    expect(products.length).toBe(6);
  });

  it('should get product by id', () => {
    const product = service.getProductById(1);
    expect(product).toBeTruthy();
    expect(product?.id).toBe(1);
  });
});
