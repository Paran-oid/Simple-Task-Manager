import { Component } from '@angular/core';
import { BodyComponent } from '../../shared/body/body.component';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [BodyComponent],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css',
})
export class CompletedComponent {}
