import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        ProductService,
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load featured products on init', () => {
    expect(component.featuredProducts).toBeTruthy();
    expect(component.featuredProducts.length).toBeGreaterThan(0);
  });

  it('should display only 3 featured products', () => {
    expect(component.featuredProducts.length).toBe(3);
  });

  it('should get products from ProductService', () => {
    const allProducts = productService.getAllProducts();
    expect(component.featuredProducts[0]).toEqual(allProducts[0]);
    expect(component.featuredProducts[1]).toEqual(allProducts[1]);
    expect(component.featuredProducts[2]).toEqual(allProducts[2]);
  });

  it('should render product cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const productCards = compiled.querySelectorAll('app-product-card');
    expect(productCards.length).toBe(3);
  });

  it('should have navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a[routerLink]');
    expect(links.length).toBeGreaterThan(0);
  });
});
