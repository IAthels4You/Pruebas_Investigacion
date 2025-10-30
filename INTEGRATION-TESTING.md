# 🔗 Pruebas de Integración - Documentación

## ¿Qué son las Pruebas de Integración?

Las pruebas de integración verifican que **múltiples componentes, servicios y módulos funcionen correctamente juntos**. A diferencia de las pruebas unitarias que prueban una sola pieza en aislamiento, las pruebas de integración validan la interacción entre diferentes partes del sistema.

---

## 📊 Resumen de Pruebas Creadas

Total: **5 archivos de integración** con **15 pruebas**

```
✅ 39 pruebas totales (24 unitarias + 15 de integración)
✅ 100% de éxito
```

---

## 🧪 Prueba de Integración 1: CartService + ProductService

**Archivo:** `src/app/integration/cart-product.integration.spec.ts`

### ¿Qué prueba?
La integración entre el servicio de carrito y el servicio de productos con datos reales.

### Pruebas incluidas:

1. **Agregar productos reales al carrito y calcular total**
   - Obtiene productos del ProductService
   - Los agrega al CartService
   - Verifica cálculo correcto del total

2. **Actualizar cantidades y recalcular**
   - Agrega un producto
   - Actualiza la cantidad a 3
   - Verifica que el total se recalcule correctamente

3. **Agregar mismo producto múltiples veces**
   - Agrega el mismo producto 3 veces
   - Verifica que se consolide en 1 item con cantidad 3

---

## 🛒 Prueba de Integración 2: CartComponent + Services

**Archivo:** `src/app/integration/cart-component.integration.spec.ts`

### ¿Qué prueba?
La integración del componente del carrito con ambos servicios (Cart y Product).

### Pruebas incluidas:

1. **Mostrar productos agregados**
   - Agrega productos desde el servicio
   - Verifica que el componente los muestre

2. **Calcular total con múltiples productos**
   - Agrega Laptop ($1299.99) + Smartphone ($899.99) + Auriculares ($199.99)
   - Verifica total: $2399.97

3. **Actualizar cantidad desde componente**
   - Agrega 1 producto
   - Actualiza cantidad a 5 desde el componente
   - Verifica sincronización con el servicio

---

## 📱 Prueba de Integración 3: ProductDetail + Services + Router

**Archivo:** `src/app/integration/product-detail.integration.spec.ts`

### ¿Qué prueba?
La carga de productos desde la URL y la integración con el carrito.

### Pruebas incluidas:

1. **Cargar producto desde parámetro de ruta**
   - Simula ruta con id=1
   - Verifica que cargue el producto correcto

2. **Agregar al carrito desde detalle**
   - Agrega producto desde el componente
   - Verifica que se refleje en el CartService

3. **Agregar múltiples cantidades**
   - Establece cantidad a 3
   - Agrega al carrito
   - Verifica cantidad correcta (usa setTimeout por Angular zoneless)

---

## 📦 Prueba de Integración 4: ProductsComponent + Services

**Archivo:** `src/app/integration/products-list.integration.spec.ts`

### ¿Qué prueba?
La lista de productos y su integración con ProductService.

### Pruebas incluidas:

1. **Cargar todos los productos**
   - Obtiene productos del servicio
   - Verifica que el componente los tenga todos (6 productos)

2. **Mostrar productos por categoría**
   - Filtra productos de Electrónica
   - Verifica que todos sean de esa categoría

3. **Verificar estructura de datos**
   - Compara primer producto del componente con el servicio
   - Verifica propiedades: id, name, price

---

## 🎯 Prueba de Integración 5: Flujo Completo E2E

**Archivo:** `src/app/integration/complete-flow.integration.spec.ts`

### ¿Qué prueba?
**Simula el flujo completo de un usuario comprando productos** (tipo End-to-End pero sin navegador)

### Pruebas incluidas:

1. **Flujo completo de compra (7 pasos)**
   ```
   1. Usuario navega → Ve 6 productos
   2. Selecciona productos → Laptop, Smartphone, Auriculares
   3. Agrega al carrito → 3 items
   4. Cambia cantidad → Auriculares x2
   5. Elimina producto → Quita Smartphone
   6. Revisa total → $1699.97 (Laptop + 2 Auriculares)
   7. Checkout → Carrito vacío
   ```

2. **Agregar mismo producto múltiples veces**
   - Simula 3 clics en "Agregar al carrito"
   - Verifica consolidación (1 item con cantidad 3)

3. **Calcular totales con cantidades mixtas**
   - Laptop x1 + Auriculares x3 + Tablet x2
   - Verifica: total = $2,899.94 / items = 6

---

## 🔍 Diferencias: Unitarias vs Integración

| Característica | Pruebas Unitarias | Pruebas de Integración |
|----------------|-------------------|------------------------|
| **Alcance** | Una sola clase/función | Múltiples componentes |
| **Dependencias** | Mockeadas/Simuladas | Reales |
| **Velocidad** | Muy rápidas | Más lentas |
| **Objetivo** | Lógica aislada | Interacción entre partes |
| **Ejemplo** | `CartService.addToCart()` | CartService + ProductService + CartComponent |

---

## 📈 Cobertura de Pruebas

### Pruebas Unitarias (24):
- ✅ Components: header, footer, product-card, home, products (5)
- ✅ Services: cart (3), product (2)
- ✅ Pages: cart (3), product-detail (4), products (1)
- ✅ App (1)
- ✅ Others (5)

### Pruebas de Integración (15):
- ✅ CartService + ProductService (3)
- ✅ CartComponent + Services (3)
- ✅ ProductDetail + Services + Router (3)
- ✅ ProductsComponent + Services (3)
- ✅ Flujo Completo E2E (3)

---

## 🚀 Ejecutar Pruebas

### Todas las pruebas:
```bash
npm test
```

### Solo pruebas de integración:
```bash
npm test -- --include='**/*.integration.spec.ts'
```

### Con cobertura:
```bash
npm test -- --code-coverage
```

---

## 💡 Buenas Prácticas Aplicadas

1. ✅ **Nombres descriptivos**: Cada prueba explica qué verifica
2. ✅ **Arrange-Act-Assert**: Preparar → Ejecutar → Verificar
3. ✅ **Datos reales**: Usa ProductService real, no mocks
4. ✅ **Limpieza**: `clearCart()` antes de cada prueba
5. ✅ **Aislamiento**: Cada prueba es independiente
6. ✅ **setTimeout**: Para pruebas con Angular zoneless
7. ✅ **Comentarios**: Explican el flujo de cada prueba

---

## 🎓 Para Explicar en Presentación

**Usa la Prueba 5 (Flujo Completo)** - Es la más visual y fácil de entender:

```typescript
it('should complete a full shopping flow', () => {
  // 1. Usuario ve productos
  const allProducts = productService.getAllProducts();
  
  // 2. Agrega al carrito
  cartService.addToCart(laptop);
  cartService.addToCart(smartphone);
  
  // 3. Modifica cantidades
  cartService.updateQuantity(headphones.id, 2);
  
  // 4. Elimina productos
  cartService.removeFromCart(smartphone.id);
  
  // 5. Verifica total
  expect(cartService.getTotalPrice()).toBe(1699.97);
  
  // 6. Checkout
  cartService.clearCart();
});
```

**Mensaje clave:** "Esta prueba simula un usuario real comprando en nuestra tienda"

---

## ✅ Conclusión

- **24 pruebas unitarias** → Verifican piezas individuales
- **15 pruebas de integración** → Verifican que trabajen juntas
- **100% de éxito** → Código confiable y robusto
- **Cobertura completa** → Desde componentes hasta flujos E2E

🎯 **El sistema está listo para producción con alta confiabilidad**
