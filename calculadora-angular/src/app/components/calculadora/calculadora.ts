import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-calculadora',
  standalone: true,
  templateUrl: './calculadora.html',
  styleUrls: ['./calculadora.scss']
})
export class CalculadoraComponent {
  display = '0';
  private expression = '';
  private lastKey = '';
  private operators = ['+', '-', '*', '/', '^', '%'];
  private teleportCount = 0;

  @ViewChild('equalsButton', { static: true }) equalsButton!: ElementRef<HTMLButtonElement>;

  pressKey(key: string) {
    if (key === 'C') return this.clear();
    if (key === '=') return this.calculate();

    if (/[0-9.]$/.test(key)) {
      const parts = this.expression.split(/[\+\-\*\/\^\%]/);
      const lastPart = parts[parts.length - 1];
      if (key === '.' && lastPart.includes('.')) return;
      this.expression += key;
      this.updateDisplay();
      this.lastKey = key;
      return;
    }

    if (this.operators.includes(key)) {
      if (!this.expression && key !== '-') return;
      if (this.operators.includes(this.lastKey)) {
        this.expression = this.expression.slice(0, -1) + key;
      } else {
        this.expression += key;
      }
      this.updateDisplay();
      this.lastKey = key;
      return;
    }
  }

  clear() {
    this.display = '0';
    this.expression = '';
    this.lastKey = '';
  }

  calculate() {
    this.teleportCount++;
    if (this.teleportCount < 3) {
      this.teleportButton();
      return;
    }

    if (!this.expression) return;

    if (this.operators.includes(this.lastKey)) {
      this.expression = this.expression.slice(0, -1);
    }

    try {
      let exp = this.expression;

      // substituir ^ por **
      exp = exp.replace(/\^/g, '**');

      // porcentagem: substitui "n%" por "(n/100)"
      exp = exp.replace(/([0-9.]+)%/g, '($1/100)');

      const result = Function(`"use strict"; return (${exp})`)();

      if (!isFinite(result)) {
        this.display = 'Erro';
      } else {
        this.display = String(result);
        this.expression = String(result);
      }
    } catch {
      this.display = 'Erro';
    }

    this.lastKey = '';
    this.teleportCount = 0;
    this.resetButtonPosition();
  }

  private updateDisplay() {
    this.display = this.expression || '0';
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    const k = event.key;

    if ((/^[0-9]$/.test(k)) || k === '.') this.pressKey(k);
    else if (['+', '-', '*', '/', '^', '%'].includes(k)) this.pressKey(k);
    else if (k === 'Enter' || k === '=') {
      event.preventDefault();
      this.pressKey('=');
    } else if (k === 'Backspace') {
      this.expression = this.expression.slice(0, -1);
      this.updateDisplay();
      this.lastKey = this.expression.slice(-1);
    } else if (k.toLowerCase() === 'c') this.pressKey('C');
  }

  private teleportButton() {
    const button = this.equalsButton.nativeElement;
    const buttonRect = button.getBoundingClientRect();

    const maxX = window.innerWidth - buttonRect.width;
    const maxY = window.innerHeight - buttonRect.height;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    button.style.position = 'fixed';
    button.style.left = `${randomX}px`;
    button.style.top = `${randomY}px`;
    button.style.zIndex = '9999';
  }

  private resetButtonPosition() {
    const button = this.equalsButton.nativeElement;
    button.style.position = '';
    button.style.left = '';
    button.style.top = '';
  }
}
