import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ContainerComponent } from '../../../shared/ui/container/container.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { DropdownComponent } from '../../../shared/ui/dropdown/dropdown.component';

import { Learning_Path, Learning_Path_Actions, navItem } from '../../../constants';
import { UiStateService } from '../../../shared/state/ui-state.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    ButtonComponent,
    DropdownComponent
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isOpen = false;
  activeItem: navItem | null = null;

  learningPath: navItem[] = Learning_Path;
  learningPathActions: navItem[] = Learning_Path_Actions;

  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private uiStateService: UiStateService,
    private router: Router
  ) { }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();

    this.isOpen = !this.isOpen;
    this.uiStateService.setOverlayState(this.isOpen);

    if (!this.isOpen) {
      this.resetMenuState();
    }
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
    if (!item.hasPreview) {
      return;
    }

    this.activeItem = item;
  }

  onItemClick(item: navItem, event: MouseEvent): void {
    event.stopPropagation();

    if (!item.hasPreview) {
      return;
    }

    this.activeItem = item;
  }

  scheduleClose(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
    }

    this.closeTimeout = setTimeout(() => {
      this.closeMenu();
    }, 200);
  }

  cancelClose(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  getPreviewTitle(): string {
    return this.activeItem ? 'Choose your next step' : '';
  }

  getPreviewDescription(): string {
    return this.activeItem
      ? `Lessons, guided explanations, practice, and quizzes for ${this.activeItem.label} in one elegant flow.`
      : '';
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
    if (!this.activeItem) return;

    const topicSlug = this.activeItem.label
      .toLowerCase()
      .replace(/\(.*?\)/g, '')
      .trim()
      .replace(/\s+/g, '-');

    switch (action.label) {
      case 'Open Learning Page':
        this.closeMenu();
        this.router.navigate(['/learning', topicSlug]);
        break;

      case 'Practice Exercises':
        this.closeMenu();
        this.router.navigate(['/learning', topicSlug, 'practice']);
        break;

      case 'Take a Quiz':
        this.closeMenu();
        this.router.navigate(['/learning', topicSlug, 'quiz']);
        break;

      default:
        console.log(`${action.label} clicked for ${this.activeItem.label}`);
        break;
    }
  }
}
