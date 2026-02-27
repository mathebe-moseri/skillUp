import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {

  @Input() items: any[] = [];
  @Input() open: boolean = false;

  @Output() itemSelect = new EventEmitter<any>();

  select(item: any) {
    this.itemSelect.emit(item);
  }
}
