import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ProductsComponent } from '../pages/products/products.component';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

/**
 * PRUEBA DE INTEGRACIÓN 4: ProductsComponent + ProductService + CartService
 * Verifica la lista de productos y la integración con el carrito
 */
describe('Integration Test 4: ProductsComponent + Services', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductService;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        ProductService,
        CartService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should load all products from ProductService', () => {
    const serviceProducts = productService.getAllProducts();
    
    expect(component.products).toEqual(serviceProducts);
    expect(component.products.length).toBe(6);
  });

  it('should display products from all categories', () => {
    const products = component.products;
    const electronicProducts = products.filter(p => p.category === 'Electrónica');
    
    expect(electronicProducts.length).toBe(6);
    expect(products.every(p => p.category === 'Electrónica')).toBe(true);
  });

  it('should have products with correct data structure from service', () => {
    const firstProduct = component.products[0];
    const serviceProduct = productService.getProductById(1);
    
    expect(firstProduct).toBeDefined();
    expect(firstProduct.id).toBe(1);
    expect(firstProduct.name).toBe('Laptop Gaming');
    expect(firstProduct.price).toBe(1299.99);
    expect(serviceProduct).toEqual(firstProduct);
  });
});
