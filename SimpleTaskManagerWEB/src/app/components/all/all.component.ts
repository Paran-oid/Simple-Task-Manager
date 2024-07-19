import { Component } from '@angular/core';
import { BodyComponent } from '../../shared/body/body.component';

@Component({
  selector: 'app-all',
  standalone: true,
  imports: [BodyComponent],
  templateUrl: './all.component.html',
  styleUrl: './all.component.css',
})
export class AllComponent {}
