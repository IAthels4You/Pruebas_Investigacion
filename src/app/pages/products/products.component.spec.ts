import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductService } from '../../services/product.service';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        ProductService,
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all products on init', () => {
    expect(component.products).toBeTruthy();
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should display correct number of products', () => {
    const allProducts = productService.getAllProducts();
    expect(component.products.length).toBe(allProducts.length);
  });

  it('should get products from ProductService', () => {
    const allProducts = productService.getAllProducts();
    expect(component.products).toEqual(allProducts);
  });

  it('should render product cards for all products', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const productCards = compiled.querySelectorAll('app-product-card');
    expect(productCards.length).toBe(component.products.length);
  });

  it('should display products with valid data', () => {
    component.products.forEach(product => {
      expect(product.id).toBeDefined();
      expect(product.name).toBeDefined();
      expect(product.price).toBeDefined();
      expect(typeof product.price).toBe('number');
    });
  });
});
