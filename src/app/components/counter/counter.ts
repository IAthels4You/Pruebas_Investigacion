import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.html',
  styleUrls: ['./counter.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterComponent {
  count = 0;

  constructor(private cdr: ChangeDetectorRef) { }

  increment(): void {
    this.count++;
    this.updateDOM();
  }

  decrement(): void {
    this.count--;
    this.updateDOM();
  }

  reset(): void {
    this.count = 0;
    this.updateDOM();
  }

  private updateDOM(): void {
    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

}
