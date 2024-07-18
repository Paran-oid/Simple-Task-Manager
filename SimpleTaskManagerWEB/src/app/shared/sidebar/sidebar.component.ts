import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  hiddenList1: boolean = false;
  hiddenList2: boolean = false;

  ToggleList(event: Event) {
    const list = event.target as HTMLElement;
    switch (list.id) {
      case '1':
        this.hiddenList1 = !this.hiddenList1;
        break;
      case '2':
        this.hiddenList2 = !this.hiddenList2;
        break;
    }
  }
}
