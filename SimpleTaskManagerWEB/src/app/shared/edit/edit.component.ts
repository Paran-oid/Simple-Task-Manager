import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  model,
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
import { CommonModule, formatDate } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IncreaseHeightInputDirective } from '../../directives/increase-height-input.directive';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { FixDateFormat } from '../../utilities/FixDateFormat';

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
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
  providers: [TaskService],
})
export class EditComponent implements OnChanges, OnInit, OnDestroy {
  @Input() taskID!: number;
  task: Task | null = null;
  form: FormGroup = new FormGroup({});

  @Output() loadEvents = new EventEmitter();
  @Output() hidePanel = new EventEmitter();
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
      title: [''],
      date: [''],
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

  get date() {
    return this.form.get('date');
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

  HidePanel() {
    this.hidePanel.emit();
  }
  loadTask() {
    this.taskService.Get(this.taskID).subscribe({
      next: (response) => {
        this.task = response;
        this.form.patchValue({ title: this.task?.title });
        this.form.patchValue({ description: this.task?.description });
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

  OnClickPut(event: Event) {
    this.Put();
  }

  Put() {
    const model: Task = {
      id: this.id?.value,
      title: this.title?.value,
      description: this.description?.value,
      status: this.task?.status!,
      important: this.task?.important!,
      date: FixDateFormat(this.date?.value),
    };
    this.taskService.Put(this.id?.value, model).subscribe({
      next: (response) => {
        this.EmitChanges();
        this.toastr.info('Changes saved', 'Everything has been saved!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ToggleImportantTask() {
    this.taskService.ToggleTaskImportance(this.taskID).subscribe({
      next: (response) => {
        this.loadTask();
        this.EmitChanges();
      },
    });
  }
}
