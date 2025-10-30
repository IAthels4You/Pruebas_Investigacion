import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop Gaming',
      description: 'Laptop potente para gaming con tarjeta gráfica dedicada',
      price: 1299.99,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
      category: 'Electrónica'
    },
    {
      id: 2,
      name: 'Smartphone Pro',
      description: 'El mejor smartphone del mercado con cámara de 108MP',
      price: 899.99,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      category: 'Electrónica'
    },
    {
      id: 3,
      name: 'Auriculares Wireless',
      description: 'Auriculares con cancelación de ruido activa',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      category: 'Electrónica'
    },
    {
      id: 4,
      name: 'Smart TV 55"',
      description: 'Televisor 4K Ultra HD con Android TV',
      price: 699.99,
      image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=500',
      category: 'Electrónica'
    },
    {
      id: 5,
      name: 'Tablet Pro',
      description: 'Tablet profesional de 11 pulgadas con stylus incluido',
      price: 599.99,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
      category: 'Electrónica'
    },
    {
      id: 6,
      name: 'Reloj Inteligente',
      description: 'Reloj inteligente con GPS y monitor de salud',
      price: 299.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      category: 'Electrónica'
    }
  ];

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    return this.products.filter(product => product.category === category);
  }
}

