import { Component } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { ContainerComponent } from "../shared/ui/container/container.component";

import { HeroComponent } from './components/hero/hero.component';
import { CtaComponent } from './components/cta/cta.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NavComponent, ContainerComponent, HeroComponent, CtaComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
