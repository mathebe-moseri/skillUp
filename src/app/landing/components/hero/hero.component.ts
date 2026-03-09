import { Component } from '@angular/core';
import { UiStateService } from '../../../shared/state/ui-state.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
    constructor(private uiStateService: UiStateService) {}
}
