import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { MatIcon } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import { Task, TaskDTO } from '../../models/task.model';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IncreaseHeightInputDirective } from '../../directives/increase-height-input.directive';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    BodyComponent,
    MatIcon,
    CommonModule,
    FormsModule,
    IncreaseHeightInputDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [TaskService],
})
export class EditComponent implements OnChanges, OnInit, OnDestroy {
  @Input() taskID!: number;
  task: Task | null = null;
  form: FormGroup = new FormGroup({});

  @Output() loadEvents = new EventEmitter();
  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  private bodySubscription!: Subscription;
  @Input() events!: Observable<void>;

  ngOnInit(): void {
    this.bodySubscription = this.events.subscribe(() => this.loadTask());

    this.form = this.fb.group({
      id: [''],
      title: [],
      description: [
        this.task?.description && this.task?.description?.trim() !== ''
          ? this.task?.description
          : '',
      ],
    });
  }

  get id() {
    return this.form.get('id');
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskID'] && this.taskID != null) {
      this.form.patchValue({ id: this.taskID });
      this.loadTask();
    }
  }

  ngOnDestroy(): void {
    this.bodySubscription.unsubscribe();
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

  @HostListener('keydown', ['$event']) OnPut(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      console.log(this.form.value);

      // this.taskService.Put(this.id?.value, this.form.value).subscribe({
      //   next: (response) => {
      //     console.log(response);
      //     this.toastr.info('Modified', 'Model updated');
      //     this.EmitChanges();
      //   },
      //   error: (error) => {
      //     console.log(error);
      //   },
      // });
    }
  }
}
