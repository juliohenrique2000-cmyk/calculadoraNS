import { Component, signal } from '@angular/core';
import { CalculadoraComponent } from './components/calculadora/calculadora';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CalculadoraComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('calculadora-angular');
}
