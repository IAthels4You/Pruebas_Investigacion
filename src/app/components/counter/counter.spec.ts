import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('CounterComponent - Pruebas de Regresión', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });

  // PRUEBAS DE REGRESIÓN

  describe('Regresión: Flujo completo de incremento', () => {

    it('debe mantener el comportamiento de incrementar de 1 en 1', () => {
      // Esta prueba protege contra cambios como: this.count += 2
      const valorInicial = component.count;

      component.increment();
      expect(component.count).toBe(valorInicial + 1);

      component.increment();
      expect(component.count).toBe(valorInicial + 2);

      component.increment();
      expect(component.count).toBe(valorInicial + 3);
    });
  });

  describe('Regresión: Flujo completo de decremento', () => {

    it('debe mantener el comportamiento de decrementar de 1 en 1', () => {
      // Esta prueba protege contra cambios como: this.count -= 2
      component.count = 10;

      component.decrement();
      expect(component.count).toBe(9);

      component.decrement();
      expect(component.count).toBe(8);
    });
  });

  describe('Regresión: Funcionalidad de reset', () => {

    it('debe mantener el comportamiento de resetear a 0', () => {
      // Esta prueba protege contra cambios como: this.count = 1 o this.count = 5
      component.count = 50;
      component.reset();
      expect(component.count).toBe(0);

      component.count = -10;
      component.reset();
      expect(component.count).toBe(0);

      component.count = 999;
      component.reset();
      expect(component.count).toBe(0);
    });
  });

  describe('Regresión: Interacción botones con UI', () => {

    it('debe mantener el comportamiento del botón Incrementar en la UI', () => {
      // Esta prueba protege contra cambios en el HTML como: (click)="decrement()"
      const initialCount = component.count;
      const buttons = compiled.querySelectorAll('button');
      const incrementBtn = buttons[0] as HTMLButtonElement;

      incrementBtn.click();
      fixture.detectChanges();

      expect(component.count).toBe(initialCount + 1);
    });

    it('debe mantener el comportamiento del botón Decrementar en la UI', () => {
      // Esta prueba protege contra cambios en el HTML
      component.count = 5;
      TestBed.flushEffects();
      fixture.detectChanges();

      const buttons = compiled.querySelectorAll('button');
      const decrementBtn = buttons[1] as HTMLButtonElement;

      decrementBtn.click();
      fixture.detectChanges();

      expect(component.count).toBe(4);
    });

    it('debe mantener el comportamiento del botón Resetear en la UI', () => {
      // Esta prueba protege contra cambios en el orden de botones o bindings
      component.count = 100;
      TestBed.flushEffects();
      fixture.detectChanges();

      const buttons = compiled.querySelectorAll('button');
      const resetBtn = buttons[2] as HTMLButtonElement;

      resetBtn.click();
      fixture.detectChanges();

      expect(component.count).toBe(0);
    });

  });

  describe('Regresión: Sistema de advertencias', () => {

    it('debe mantener la regla de NO mostrar advertencia cuando count <= 10', () => {
      // Esta prueba protege contra cambios como: *ngIf="count > 5" o *ngIf="count >= 10"
      const casosValidos = [0, 5, 10, -5];

      casosValidos.forEach(valor => {
        component.count = valor;
        TestBed.flushEffects();
        fixture.detectChanges();

        const warning = compiled.querySelector('.warning');
        expect(warning).toBeFalsy();
      });
    });

  });

  describe('Regresión: Casos extremos y límites', () => {

    it('debe mantener el soporte para números negativos', () => {
      // Esta prueba protege contra validaciones que bloqueen negativos
      component.count = 0;
      component.decrement();
      expect(component.count).toBe(-1);

      component.decrement();
      expect(component.count).toBe(-2);
    });

    it('debe mantener la estabilidad con múltiples operaciones consecutivas', () => {
      // Esta prueba protege contra bugs de rendimiento o acumulación de errores
      for (let i = 0; i < 50; i++) {
        component.increment();
      }
      expect(component.count).toBe(50);

      for (let i = 0; i < 30; i++) {
        component.decrement();
      }
      expect(component.count).toBe(20);
    });

    it('debe mantener el comportamiento con valores muy grandes', () => {
      // Esta prueba protege contra problemas con números grandes
      component.count = 9999;
      component.increment();
      expect(component.count).toBe(10000);
    });
  });

  describe('Regresión: Flujos de usuario completos', () => {

    it('debe mantener el flujo: incrementar → advertencia → reset', () => {
      // Esta prueba protege el flujo de usuario más común

      // Usuario incrementa hasta pasar el límite
      for (let i = 0; i < 12; i++) {
        component.increment();
      }
      expect(component.count).toBe(12);

      TestBed.flushEffects();
      fixture.detectChanges();
      let warning = compiled.querySelector('.warning');
      expect(warning).toBeTruthy();

      // Usuario resetea
      component.reset();
      fixture.detectChanges();

      expect(component.count).toBe(0);
      warning = compiled.querySelector('.warning');
      expect(warning).toBeFalsy();
    });

    it('debe mantener el flujo: incrementar → decrementar → balancear', () => {
      // Esta prueba protege el flujo de incrementos y decrementos alternados
      component.increment();
      component.increment();
      component.increment();
      expect(component.count).toBe(3);

      component.decrement();
      expect(component.count).toBe(2);

      component.increment();
      expect(component.count).toBe(3);
    });
  });
});