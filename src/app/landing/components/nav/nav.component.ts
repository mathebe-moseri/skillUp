import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerComponent } from '../../../shared/ui/container/container.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { DropdownComponent } from '../../../shared/ui/dropdown/dropdown.component';

import { Learning_Path, Learning_Path_Actions, navItem } from '../../../constants';

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
  isPinned = false;
  hoveredItem: string | null = null;

  learningPath: navItem[] = Learning_Path;
  learningPathActions: navItem[] = Learning_Path_Actions;

  openMenu(): void {
    if (!this.isPinned) {
      this.isOpen = true;
    }
  }

  closeMenu(): void {
    if (!this.isPinned) {
      this.isOpen = false;
      this.hoveredItem = null;
    }
  }

  toggleMenu(event: MouseEvent): void {
    event.stopPropagation();

    if (this.isOpen && this.isPinned) {
      this.isOpen = false;
      this.isPinned = false;
      this.hoveredItem = null;
      return;
    }

    if (this.isOpen && !this.isPinned) {
      this.isPinned = true;
      return;
    }

    this.isOpen = true;
    this.isPinned = true;
  }

  onItemEnter(item: navItem): void {
    this.hoveredItem = item.hasPreview ? item.label : null;
  }

  resetPreview(): void {
    this.hoveredItem = null;
  }
}