import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../models/product.model';
import { ComponentRef } from '@angular/core';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let componentRef: ComponentRef<ProductCardComponent>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: 99.99,
    image: 'https://test.com/image.jpg',
    category: 'Test'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    
    componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain(mockProduct.name);
    expect(compiled.textContent).toContain(mockProduct.price.toString());
  });
});
