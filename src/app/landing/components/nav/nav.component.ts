import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainerComponent } from '../../../shared/ui/container/container.component';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { DropdownComponent } from '../../../shared/ui/dropdown/dropdown.component';

import { Learning_Path, Learning_Path_Actions, navItem } from '../../../constants';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [ContainerComponent, ButtonComponent, DropdownComponent, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isOpen = false;
  isPinned = false;
  hoveredItem: string | null = null;

  learningPath: navItem[] = Learning_Path;
  learningPathActions: navItem[] = Learning_Path_Actions;

  openMenu() {
    this.isOpen = true;
  }

  closeMenu() {
    if (!this.isPinned) {
      this.isOpen = false;
      this.hoveredItem = null;
    }
  }

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();

    if (this.isOpen && this.isPinned) {
      this.isOpen = false;
      this.isPinned = false;
      this.hoveredItem = null;
    } else {
      this.isOpen = true;
      this.isPinned = true;
    }
  }

  onItemEnter(item: navItem) {
    this.hoveredItem = item.hasPreview ? item.label : null;
  }

  resetPreview() {
    this.hoveredItem = null;
  }
}