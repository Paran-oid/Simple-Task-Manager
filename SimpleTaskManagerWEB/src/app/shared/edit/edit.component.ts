import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { MatIcon } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncreaseHeightInputDirective } from '../../directives/increase-height-input.directive';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    BodyComponent,
    MatIcon,
    CommonModule,
    FormsModule,
    IncreaseHeightInputDirective,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [TaskService],
})
export class EditComponent implements OnChanges {
  @Input() taskID!: number;
  task: Task | null = null;

  @Output() loadEvents = new EventEmitter();
  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskID'] && this.taskID != null) {
      this.loadTask();
    }
  }

  EmitChanges() {
    this.loadEvents.emit();
  }
  loadTask() {
    this.taskService.Get(this.taskID).subscribe({
      next: (response) => {
        this.task = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
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
            this.loadTask();
            this.EmitChanges();
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
}
