import { Component } from '@angular/core';
import { BodyComponent } from '../../shared/body/body.component';

@Component({
  selector: 'app-scheduled',
  standalone: true,
  imports: [BodyComponent],
  templateUrl: './scheduled.component.html',
  styleUrl: './scheduled.component.css',
})
export class ScheduledComponent {}
