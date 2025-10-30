import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, ActivatedRoute, Router } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: ProductService;
  let cartService: CartService;
  let router: Router;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => '1'
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        ProductService,
        CartService,
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    cartService = TestBed.inject(CartService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load product from route parameter', () => {
    expect(component.product).toBeTruthy();
    expect(component.product?.id).toBe(1);
  });

  it('should have initial quantity of 1', () => {
    expect(component.quantity).toBe(1);
  });

  it('should add product to cart', () => {
    spyOn(cartService, 'addToCart');
    component.addToCart();
    expect(cartService.addToCart).toHaveBeenCalled();
  });

  it('should add product with correct quantity', () => {
    spyOn(cartService, 'addToCart');
    component.quantity = 3;
    component.addToCart();
    expect(cartService.addToCart).toHaveBeenCalledTimes(3);
  });

  it('should show added to cart message after adding', () => {
    component.addToCart();
    expect(component.addedToCart).toBe(true);
  });

  it('should hide added to cart message after timeout', (done) => {
    component.addToCart();
    expect(component.addedToCart).toBe(true);
    
    setTimeout(() => {
      expect(component.addedToCart).toBe(false);
      done();
    }, 3100);
  });

  it('should increase quantity', () => {
    component.quantity = 5;
    component.increaseQuantity();
    expect(component.quantity).toBe(6);
  });

  it('should not increase quantity above 10', () => {
    component.quantity = 10;
    component.increaseQuantity();
    expect(component.quantity).toBe(10);
  });

  it('should decrease quantity', () => {
    component.quantity = 5;
    component.decreaseQuantity();
    expect(component.quantity).toBe(4);
  });

  it('should not decrease quantity below 1', () => {
    component.quantity = 1;
    component.decreaseQuantity();
    expect(component.quantity).toBe(1);
  });

  it('should navigate to products if product not found', async () => {
    const mockRouteNotFound = {
      snapshot: {
        paramMap: {
          get: (key: string) => '999'
        }
      }
    };

    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [ProductDetailComponent],
      providers: [
        ProductService,
        CartService,
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: ActivatedRoute, useValue: mockRouteNotFound }
      ]
    }).compileComponents();

    const newRouter = TestBed.inject(Router);
    spyOn(newRouter, 'navigate');
    
    const newFixture = TestBed.createComponent(ProductDetailComponent);
    const newComponent = newFixture.componentInstance;
    
    // El constructor ya fue llamado al crear el componente
    expect(newRouter.navigate).toHaveBeenCalledWith(['/productos']);
  });
});
