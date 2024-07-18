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
import { BodyComponent } from '../body/body.component';

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
export class TodayComponent {
  title: string = 'Today';

  hiddenTasks: boolean = true;

  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.taskService.GetAll().subscribe({
      next: (response) => {
        this.tasks = response;
        this.pendingTasks = this.tasks.filter((t) => t.status === 'Ongoing');
        this.completedTasks = this.tasks.filter(
          (t) => t.status === 'Completed'
        );
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  OnToggleTasks() {
    this.hiddenTasks = !this.hiddenTasks;
  }

  CheckNumberCompletedTasks() {
    for (let task of this.tasks) {
      if (task.status === 'Completed') {
        return true;
      }
    }
    return false;
  }

  OnAdd() {
    this.ngOnInit();
  }

  ToggleTask(event: Event) {
    const TaskInput = event.target as HTMLInputElement;
    let status: string = TaskInput.checked ? 'Completed' : 'Ongoing';
    let task: Task;

    this.taskService.Get(parseInt(TaskInput.value)).subscribe({
      next: (response) => {
        task = response;

        this.taskService.ToggleTask(task.id, status).subscribe({
          next: (response) => {
            this.ngOnInit();
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  OnDelete(ID: number) {
    if (ID != 0 && ID != null) {
      this.taskService.Delete(ID).subscribe({
        next: (response) => {
          this.ngOnInit();
          this.toastr.error('task deleted successfully', 'Done');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
