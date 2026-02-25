import { Component } from '@angular/core';
import { ContainerComponent } from '../../../shared/ui/container/container.component';
import { ButtonComponent } from "../../../shared/ui/button/button.component";

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ContainerComponent, ButtonComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
