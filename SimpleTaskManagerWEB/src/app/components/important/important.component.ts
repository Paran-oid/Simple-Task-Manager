import { Component } from '@angular/core';
import { BodyComponent } from '../../shared/body/body.component';

@Component({
  selector: 'app-important',
  standalone: true,
  imports: [BodyComponent],
  templateUrl: './important.component.html',
  styleUrl: './important.component.scss',
})
export class ImportantComponent {}
