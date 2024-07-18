import { Component, HostListener } from '@angular/core';

import {
  MatFormField,
  MatFormFieldControl,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

import { CreateTaskDTO, Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { MatContextMenuTrigger } from '../../directives/MatContextMenuTrigger.directive';

@Component({
  selector: 'app-home',
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  hiddenTasks: boolean = true;

  form: FormGroup = new FormGroup({});
  tasks: Task[] = [];
  constructor(private taskService: TaskService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.taskService.GetAll().subscribe({
      next: (response) => {
        this.tasks = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.form = this.fb.group({
      task: ['', Validators.required],
    });
  }

  get task() {
    return this.form.get('task');
  }

  @HostListener('keydown', ['$event']) KeyboardListen(event: KeyboardEvent) {
    if (event.key === 'enter') {
      this.OnAdd();
    }
  }

  OnToggleTasks() {
    this.hiddenTasks = !this.hiddenTasks;
  }

  OnAdd() {
    if (this.task?.value !== '') {
      const model = new CreateTaskDTO(this.task?.value.toString());
      this.taskService.Post(model).subscribe({
        next: (response) => {
          this.ngOnInit();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
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
          // ====================================================================
          // Make it so that every task looks good just like in todoist or todolist (Microsoft)
          // Make it so when I click edit on any task it shows an input on the text and when I click enter it gets edited
          // Remove all unessential console.logs
          // Make the color of the menu icon black
          // Steal some more ideas from todolsit (Microsoft) and todoist
          // ====================================================================
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
