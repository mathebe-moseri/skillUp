import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  @Input() className = '';

  base = 'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8';
}
