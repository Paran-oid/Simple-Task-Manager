import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { MatContextMenuTrigger } from '../../directives/MatContextMenuTrigger.directive';
import { CreatetaskComponent } from '../../shared/createtask/createtask.component';
import { ToastrService } from 'ngx-toastr';
import { BodyComponent } from '../../shared/body/body.component';

@Component({
  selector: 'app-today',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatContextMenuTrigger,
    CreatetaskComponent,
    BodyComponent,
  ],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css',
})
export class TodayComponent {}
