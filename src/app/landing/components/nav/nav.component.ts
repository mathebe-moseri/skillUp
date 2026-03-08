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
  hoveredItem: string | null = null;
  selectedTopic: string = 'JavaScript';

  learningPath: navItem[] = Learning_Path;
  learningPathActions: navItem[] = Learning_Path_Actions;

  constructor(
    private uiStateService: UiStateService,
    private router: Router
  ) {}

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.isOpen = !this.isOpen;

    this.uiStateService.setOverlayState(this.isOpen);

    if (!this.isOpen) {
      this.hoveredItem = null;
    }
  }

  closeMenu(): void {
    this.isOpen = false;
    this.hoveredItem = null;
    this.uiStateService.closeOverlay();
  }

  onItemEnter(item: navItem): void {
    this.hoveredItem = item.hasPreview ? item.label : null;

    if (item.hasPreview) {
      this.selectedTopic = item.label;
    }
  }

  resetPreview(): void {
    this.hoveredItem = null;
  }

  getPreviewTitle(): string {
    return 'Choose your next step';
  }

  getPreviewDescription(): string {
    return `Lessons, guided explanations, practice, and quizzes for ${this.selectedTopic} in one elegant flow.`;
  }

  onActionClick(action: navItem): void {
    const topicSlug = this.selectedTopic.toLowerCase().replace(/\s+/g, '-');

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
        console.log(`${action.label} clicked for ${this.selectedTopic}`);
        break;
    }
  }
}