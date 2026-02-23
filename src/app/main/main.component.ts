import { Component } from '@angular/core';
import { LandingComponent } from '../landing/landing.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [LandingComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
