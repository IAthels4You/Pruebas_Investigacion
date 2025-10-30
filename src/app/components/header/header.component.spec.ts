import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cartService: CartService;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    image: 'test.jpg',
    category: 'Test'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial cart items as 0', () => {
    expect(component.totalItems()).toBe(0);
  });

  it('should update total items when products are added to cart', () => {
    cartService.addToCart(mockProduct);
    fixture.detectChanges();
    expect(component.totalItems()).toBe(1);
  });

  it('should update total items when multiple products are added', () => {
    cartService.addToCart(mockProduct);
    cartService.addToCart(mockProduct);
    cartService.addToCart(mockProduct);
    fixture.detectChanges();
    expect(component.totalItems()).toBe(3);
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('a');
    expect(links.length).toBeGreaterThan(0);
  });
});
