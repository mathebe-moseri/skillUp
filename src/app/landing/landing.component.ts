import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { CtaComponent } from './components/cta/cta.component';
import { ContainerComponent } from '../shared/ui/container/container.component';
import { UiStateService } from '../shared/state/ui-state.service';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    NavComponent,
    HeroComponent,
    CtaComponent,
    ContainerComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(public uiStateService: UiStateService) {}
}