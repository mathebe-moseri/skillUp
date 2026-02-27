import { Component } from '@angular/core';
import { ContainerComponent } from '../../../shared/ui/container/container.component';
import { ButtonComponent } from "../../../shared/ui/button/button.component";
import { DropdownComponent } from "../../../shared/ui/dropdown/dropdown.component";
import { Learning_Path } from '../../../constants';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ContainerComponent, ButtonComponent, DropdownComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  learningPath = Learning_Path;

}
