import { Component, Input } from '@angular/core';

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
import { CreatetaskComponent } from '../createtask/createtask.component';
import { ToastrService } from 'ngx-toastr';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-body',
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
    EditComponent,
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {
  @Input() title: string = '';
  selectedTaskID!: number;

  hiddenTasks: boolean = true;
  hiddenEdit: boolean = true;

  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.LoadTasks();
  }

  OnToggleTasks() {
    this.hiddenTasks = !this.hiddenTasks;
  }

  OnToggleEdit(ID: number) {
    if (this.hiddenEdit === true) {
      this.hiddenEdit = !this.hiddenEdit;
      this.selectedTaskID = ID;
    } else {
      this.selectedTaskID = ID;
    }
  }

  LoadTasks() {
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
