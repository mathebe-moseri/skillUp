import { Component } from '@angular/core';
import { CardComponent } from "../../../shared/ui/card/card.component";

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css'
})
export class CtaComponent {

}
