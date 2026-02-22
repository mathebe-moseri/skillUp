import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {

  title = 'skillUp';

  constructor() { }

  @ViewChild('wordEl') wordEl!: ElementRef;

  words = ['running', 'live', 'awesome', 'smooth'];
  index = 0;

  ngAfterViewInit() {
    this.rotateWord();
  }

  rotateWord() {
    const el = this.wordEl.nativeElement;
    const containerWidth = el.parentElement.offsetWidth;

    el.textContent = this.words[this.index];
    this.index = (this.index + 1) % this.words.length;

    gsap.fromTo(
      el,
      { x: -containerWidth, opacity: 0 },
      {
        x: containerWidth,
        opacity: 6,
        duration: 4,
        ease: 'none',
        onComplete: () => {
          gsap.to(el, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => this.rotateWord()
          });
        }
      }
    );
  }

}
