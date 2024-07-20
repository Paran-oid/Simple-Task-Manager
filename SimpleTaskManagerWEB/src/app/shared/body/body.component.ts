import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';

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
import { Subject } from 'rxjs';

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
export class BodyComponent implements OnInit {
  @Input() title: string = '';
  selectedTaskID!: number;

  hiddenTasks: boolean = true;
  hiddenEdit: boolean = true;

  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];
  tasks: Task[] = [];

  editEvent: Subject<void> = new Subject();

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

  OnToggleEdit(ID?: number) {
    if (ID != this.selectedTaskID && ID) {
      this.selectedTaskID = ID;
    } else if (ID === this.selectedTaskID) {
      this.hiddenEdit = !this.hiddenEdit;
    } else {
      this.hiddenEdit = true;
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

  emitEventToEdit() {
    this.editEvent.next();
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
    this.LoadTasks();
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
            this.LoadTasks();
            this.emitEventToEdit();
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
          this.LoadTasks();
          this.toastr.error('task deleted successfully', 'Done');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
