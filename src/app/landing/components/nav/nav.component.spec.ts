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
onItemClick(_t30: navItem,$event: PointerEvent) {
throw new Error('Method not implemented.');
}
activeItem: any;
cancelClose() {
throw new Error('Method not implemented.');
}
scheduleClose() {
throw new Error('Method not implemented.');
}
getActionIconClass(_t50: navItem): string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined {
throw new Error('Method not implemented.');
}
getActionCardClass(_t50: navItem): string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined {
throw new Error('Method not implemented.');
}
toggleMenu($event: PointerEvent) {
throw new Error('Method not implemented.');
}
onActionClick(_t50: navItem) {
throw new Error('Method not implemented.');
}
getPreviewDescription() {
throw new Error('Method not implemented.');
}
getPreviewTitle() {
throw new Error('Method not implemented.');
}
selectedTopic: any;
resetPreview() {
throw new Error('Method not implemented.');
}
  isOpen = false;
  hoveredItem: string | null = null;

  learningPath: navItem[] = Learning_Path;
  learningPathActions: navItem[] = Learning_Path_Actions;

  openMenu() {
    this.isOpen = true;
  }

  closeMenu() {
    this.isOpen = false;
    this.hoveredItem = null;
  }

  onItemEnter(item: navItem) {
    this.hoveredItem = item.hasPreview ? item.label : null;
  }

  onItemLeave() {
    this.hoveredItem = null;
  }
}