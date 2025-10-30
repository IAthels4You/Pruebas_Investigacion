# Guía de Pruebas Unitarias - Jasmine + Karma

## 📋 Estructura del Proyecto de Pruebas

Este proyecto está configurado con **Jasmine** como framework de testing y **Karma** como test runner para Angular.

### Archivos de Configuración

- `karma.conf.js` - Configuración del test runner Karma
- `src/test.ts` - Archivo de inicialización del entorno de pruebas
- `tsconfig.spec.json` - Configuración de TypeScript para pruebas

### Estructura de Archivos `.spec.ts`

```
src/
├── test.ts                                      # Inicialización de pruebas
└── app/
    ├── app.spec.ts                              # Pruebas del componente principal
    ├── services/
    │   ├── cart.service.spec.ts                 # Pruebas del servicio de carrito
    │   └── product.service.spec.ts              # Pruebas del servicio de productos
    ├── components/
    │   ├── header/
    │   │   └── header.component.spec.ts         # Pruebas del header
    │   ├── footer/
    │   │   └── footer.component.spec.ts         # Pruebas del footer
    │   └── product-card/
    │       └── product-card.component.spec.ts   # Pruebas de la tarjeta de producto
    └── pages/
        ├── home/
        │   └── home.component.spec.ts           # Pruebas de la página home
        ├── products/
        │   └── products.component.spec.ts       # Pruebas de la página productos
        ├── product-detail/
        │   └── product-detail.component.spec.ts # Pruebas del detalle de producto
        └── cart/
            └── cart.component.spec.ts           # Pruebas de la página carrito
```

## 🚀 Comandos Disponibles

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas con cobertura
```bash
ng test --code-coverage
```

### Ejecutar pruebas sin navegador (headless)
```bash
ng test --browsers=ChromeHeadless
```

### Ejecutar pruebas una sola vez (sin watch mode)
```bash
ng test --watch=false
```

## 📦 Dependencias Instaladas

### Dependencias principales de testing:
- `jasmine-core` (~5.8.0) - Framework de testing
- `@types/jasmine` (~5.1.0) - Tipos de TypeScript para Jasmine
- `karma` (~6.4.0) - Test runner
- `karma-jasmine` (~5.1.0) - Adaptador de Jasmine para Karma
- `karma-chrome-launcher` (~3.2.0) - Launcher de Chrome para Karma
- `karma-coverage` (~2.2.0) - Generador de reportes de cobertura
- `karma-jasmine-html-reporter` (~2.1.0) - Reporter HTML para Karma
- `@angular/platform-browser-dynamic` - Testing utilities de Angular
- `@types/node` - Tipos de Node.js para TypeScript

## ✅ Cobertura de Pruebas

### Servicios (2/2 - 100%)
- ✅ `CartService` - 10 pruebas unitarias
  - Agregar productos al carrito
  - Incrementar cantidad de productos existentes
  - Remover productos del carrito
  - Actualizar cantidades
  - Calcular totales (items y precio)
  - Limpiar carrito

- ✅ `ProductService` - 8 pruebas unitarias
  - Obtener todos los productos
  - Obtener producto por ID
  - Obtener productos por categoría
  - Validación de estructura de datos
  - Verificar IDs únicos

### Componentes (7/7 - 100%)

#### Componentes de Layout (2/2)
- ✅ `App` - 4 pruebas
- ✅ `HeaderComponent` - 5 pruebas
- ✅ `FooterComponent` - 2 pruebas

#### Componentes Reutilizables (1/1)
- ✅ `ProductCardComponent` - 6 pruebas

#### Páginas (4/4)
- ✅ `HomeComponent` - 6 pruebas
- ✅ `ProductsComponent` - 6 pruebas
- ✅ `ProductDetailComponent` - 11 pruebas
- ✅ `CartComponent` - 8 pruebas

**Total: 66 pruebas unitarias**

## 🧪 Patrones de Prueba Utilizados

### 1. Pruebas de Servicios
```typescript
describe('ServiceName', () => {
  let service: ServiceName;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceName);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

### 2. Pruebas de Componentes Standalone
```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentName]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### 3. Pruebas con Mocks
```typescript
const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (key: string) => '1'
    }
  }
};

beforeEach(async () => {
  await TestBed.configureTestingModule({
    providers: [
      { provide: ActivatedRoute, useValue: mockActivatedRoute }
    ]
  }).compileComponents();
});
```

### 4. Pruebas de Componentes con Inputs (Signals)
```typescript
const mockProduct: Product = { /* ... */ };

beforeEach(async () => {
  fixture = TestBed.createComponent(ProductCardComponent);
  component = fixture.componentInstance;
  componentRef = fixture.componentRef;
  
  // Establecer input signal
  componentRef.setInput('product', mockProduct);
  fixture.detectChanges();
});
```

## 📊 Visualización de Resultados

### En el Navegador
Karma abrirá automáticamente un navegador Chrome donde podrás ver:
- Resultados de las pruebas en tiempo real
- Detalles de pruebas fallidas
- Tiempos de ejecución

### En la Terminal
Los resultados también se mostrarán en la terminal con:
- Número total de pruebas ejecutadas
- Pruebas exitosas/fallidas
- Tiempo de ejecución
- Errores detallados (si los hay)

### Reporte de Cobertura
Después de ejecutar con `--code-coverage`, encontrarás el reporte en:
```
coverage/pruebas/index.html
```

## 🔧 Configuración de Karma

El archivo `karma.conf.js` está configurado con:
- **Framework**: Jasmine + @angular-devkit/build-angular
- **Navegador**: Chrome
- **Reportes**: Progress + Jasmine HTML
- **Cobertura**: HTML + Text Summary
- **Auto-reload**: Activado para watch mode

## 💡 Mejores Prácticas Implementadas

1. ✅ **Aislamiento de pruebas**: Cada prueba es independiente
2. ✅ **Mocks apropiados**: Se usan mocks para dependencias externas
3. ✅ **Nombres descriptivos**: Los nombres de las pruebas explican qué se está probando
4. ✅ **Arrange-Act-Assert**: Estructura clara en cada prueba
5. ✅ **beforeEach**: Preparación consistente del entorno de pruebas
6. ✅ **Async/Await**: Manejo correcto de operaciones asíncronas
7. ✅ **TestBed**: Uso del módulo de testing de Angular
8. ✅ **Signals**: Manejo correcto de Angular signals en las pruebas

## 🐛 Depuración de Pruebas

### Para depurar una prueba específica:
1. Abre las DevTools en el navegador de Karma
2. Busca tu archivo `.spec.ts` en las sources
3. Coloca breakpoints
4. Recarga la página de Karma

### Para ejecutar solo una prueba específica:
```typescript
// Cambiar 'describe' por 'fdescribe' o 'it' por 'fit'
fdescribe('MyComponent', () => { /* ... */ });
// o
fit('should do something', () => { /* ... */ });
```

### Para omitir pruebas temporalmente:
```typescript
// Cambiar 'describe' por 'xdescribe' o 'it' por 'xit'
xdescribe('MyComponent', () => { /* ... */ });
// o
xit('should do something', () => { /* ... */ });
```

## 📚 Recursos Adicionales

- [Documentación oficial de Jasmine](https://jasmine.github.io/)
- [Documentación oficial de Karma](https://karma-runner.github.io/)
- [Guía de testing de Angular](https://angular.dev/guide/testing)
- [Angular Testing Library](https://testing-library.com/docs/angular-testing-library/intro/)

## ⚠️ Notas Importantes

- Las pruebas se ejecutan automáticamente cuando guardas cambios
- El navegador de Karma debe permanecer abierto durante el desarrollo
- Los errores de compilación pueden causar que las pruebas fallen
- Asegúrate de que todos los imports estén correctos en los archivos `.spec.ts`

## 🎯 Próximos Pasos

Para mejorar aún más las pruebas, considera:

1. **Aumentar la cobertura**: Apuntar a >80% de cobertura de código
2. **Tests E2E**: Agregar pruebas end-to-end con Cypress o Playwright
3. **CI/CD**: Integrar las pruebas en un pipeline de integración continua
4. **Tests de integración**: Probar la interacción entre múltiples componentes
5. **Performance testing**: Agregar pruebas de rendimiento
6. **Accessibility testing**: Verificar la accesibilidad de la aplicación

---

✨ **¡Las pruebas están listas para usar!** Solo ejecuta `npm test` y comienza a desarrollar con confianza.
