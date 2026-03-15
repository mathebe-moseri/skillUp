import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

import { ContainerComponent } from '../../../shared/ui/container/container.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { DropdownComponent } from '../../../shared/ui/dropdown/dropdown.component';

import { Learning_Path, Learning_Path_Actions, navItem } from '../../../constants';
import { UiStateService } from '../../../shared/state/ui-state.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    ButtonComponent,
    DropdownComponent,
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements AfterViewInit, OnDestroy {
  isOpen = false;
  activeItem: navItem | null = null;

  learningPath: navItem[] = Learning_Path;
  learningPathActions: navItem[] = Learning_Path_Actions;

  private closeTimeout: ReturnType<typeof setTimeout> | null = null;
  private comingSoonTimeline?: gsap.core.Timeline;

@ViewChild('ring') ring?: ElementRef<HTMLDivElement>;
@ViewChild('core') core?: ElementRef<HTMLDivElement>;
@ViewChild('dot1') dot1?: ElementRef<HTMLDivElement>;
@ViewChild('dot2') dot2?: ElementRef<HTMLDivElement>;
@ViewChild('dot3') dot3?: ElementRef<HTMLDivElement>;
  @ViewChild('comingSoonText') comingSoonText?: ElementRef<HTMLParagraphElement>;

  constructor(
    private uiStateService: UiStateService,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.initComingSoonAnimation());
  }

  ngOnDestroy(): void {
    this.comingSoonTimeline?.kill();
  }

  get showRightPanel(): boolean {
    return !!this.activeItem;
  }

  get showActionCards(): boolean {
    return this.activeItem?.status === 'available' && !!this.activeItem?.hasPreview;
  }

  get showComingSoonPanel(): boolean {
    return this.activeItem?.status === 'coming-soon';
  }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();

    this.isOpen = !this.isOpen;
    this.uiStateService.setOverlayState(this.isOpen);

    if (this.isOpen && !this.activeItem) {
      this.activeItem = this.learningPath[0];
    }

    if (!this.isOpen) {
      this.resetMenuState();
    }

    setTimeout(() => this.initComingSoonAnimation());
  }

  closeMenu(): void {
    this.isOpen = false;
    this.resetMenuState();
    this.uiStateService.closeOverlay();

    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  resetMenuState(): void {
    this.activeItem = null;
  }

  onItemEnter(item: navItem): void {
    this.activeItem = item;
    setTimeout(() => this.initComingSoonAnimation());
  }

  onItemClick(item: navItem, event: MouseEvent): void {
    event.stopPropagation();
    this.activeItem = item;
    setTimeout(() => this.initComingSoonAnimation());
  }

  scheduleClose(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }

    this.closeTimeout = setTimeout(() => {
      this.closeMenu();
    }, 600);
  }

  cancelClose(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

getPreviewTitle(): string {
  if (!this.activeItem) return '';

  if (this.showActionCards) {
    return 'Choose your next step';
  }

  return 'Coming soon';
}

getPreviewDescription(): string {
  if (!this.activeItem) return '';

  if (this.showActionCards) {
    return `Lessons, practice, and quizzes for ${this.activeItem.label}.`;
  }

  return `Explore Angular while this path is being prepared.`;
}

  getComingSoonFeatures(): string[] {
    return [
      'Concept overviews and guided lessons',
      'Practice exercises and quizzes',
      'Interview-focused learning flow'
    ];
  }

  getActionIconClass(action: navItem): string {
    if (action.featured) {
      return 'bg-slate-100 text-slate-500 group-hover:bg-gradient-to-br group-hover:from-sky-400 group-hover:to-blue-500 group-hover:text-white';
    }

    if (action.locked) {
      return 'bg-amber-50 text-amber-500 border border-amber-100 group-hover:bg-sky-100 group-hover:text-sky-600';
    }

    return 'bg-slate-100 text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-600';
  }

  getActionCardClass(action: navItem): string {
    return action.featured
      ? 'border-slate-200 bg-white group-hover:border-sky-200 group-hover:bg-sky-50 group-hover:shadow-[0_16px_34px_rgba(14,165,233,0.10)]'
      : 'border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/70 hover:shadow-[0_12px_28px_rgba(15,23,42,0.06)]';
  }

  onActionClick(action: navItem): void {
    if (!this.activeItem || !this.activeItem.hasPreview || this.activeItem.status !== 'available') {
      return;
    }

    const topicSlug = this.activeItem.label
      .toLowerCase()
      .replace(/\(.*?\)/g, '')
      .trim()
      .replace(/\s+/g, '-');

    switch (action.label) {
      case 'Start Learning':
        this.closeMenu();
        this.router.navigate(['/learn', topicSlug]);
        break;

      case 'Practice Exercises':
        this.closeMenu();
        this.router.navigate(['/practice', topicSlug]);
        break;

      case 'Take a Quiz':
        this.closeMenu();
        this.router.navigate(['/quiz', topicSlug]);
        break;

      default:
        console.log(`${action.label} clicked for ${this.activeItem.label}`);
        break;
    }
  }

  goToPath(label: string): void {
    const item = this.learningPath.find(path => path.label === label);
    if (item) {
      this.activeItem = item;
      setTimeout(() => this.initComingSoonAnimation());
    }
  }

private initComingSoonAnimation(): void {
  if (!this.showComingSoonPanel) {
    this.comingSoonTimeline?.kill();
    return;
  }

  if (
    !this.ring?.nativeElement ||
    !this.core?.nativeElement ||
    !this.dot1?.nativeElement ||
    !this.dot2?.nativeElement ||
    !this.dot3?.nativeElement ||
    !this.comingSoonText?.nativeElement
  ) {
    return;
  }

  this.comingSoonTimeline?.kill();

  const ring = this.ring.nativeElement;
  const core = this.core.nativeElement;
  const dot1 = this.dot1.nativeElement;
  const dot2 = this.dot2.nativeElement;
  const dot3 = this.dot3.nativeElement;
  const text = this.comingSoonText.nativeElement;

  gsap.set(ring, { scale: 0.96, opacity: 0.7 });
  gsap.set(core, { y: 0, scale: 1 });
  gsap.set([dot1, dot2, dot3], { y: 0, x: 0, opacity: 0.9 });
  gsap.set(text, { opacity: 0.5 });

  this.comingSoonTimeline = gsap.timeline({
    repeat: -1,
    defaults: { ease: 'sine.inOut' }
  });

  this.comingSoonTimeline
    .to(core, {
      y: -6,
      scale: 1.04,
      duration: 1.6
    }, 0)
    .to(core, {
      y: 0,
      scale: 1,
      duration: 1.6
    }, 1.6)

    .to(ring, {
      scale: 1.06,
      opacity: 1,
      duration: 1.6
    }, 0)
    .to(ring, {
      scale: 0.96,
      opacity: 0.7,
      duration: 1.6
    }, 1.6)

    .to(dot1, {
      x: 10,
      y: -8,
      duration: 1.8
    }, 0)
    .to(dot1, {
      x: 0,
      y: 0,
      duration: 1.8
    }, 1.8)

    .to(dot2, {
      x: -8,
      y: 10,
      duration: 2
    }, 0.1)
    .to(dot2, {
      x: 0,
      y: 0,
      duration: 2
    }, 2.1)

    .to(dot3, {
      x: 8,
      y: -10,
      duration: 2.2
    }, 0.2)
    .to(dot3, {
      x: 0,
      y: 0,
      duration: 2.2
    }, 2.4)

    .to(text, {
      opacity: 1,
      duration: 1.2
    }, 0.3)
    .to(text, {
      opacity: 0.5,
      duration: 1.2
    }, 1.8);
}
}