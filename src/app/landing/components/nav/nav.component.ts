import { Component } from '@angular/core';
import { ContainerComponent } from '../../../shared/ui/container/container.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
