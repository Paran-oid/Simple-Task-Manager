import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import { TaskDTO } from '../../models/task.model';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';

import { FixDateFormat } from '../../utilities/FixDateFormat';

@Component({
  selector: 'app-createtask',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatMenuModule,
  ],
  templateUrl: './createtask.component.html',
  styleUrl: './createtask.component.css',
})
export class CreatetaskComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  @Output() addEvent = new EventEmitter();

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      task: ['', Validators.required],
      date: [''],
    });
  }

  get task() {
    return this.form.get('task');
  }

  get date() {
    return this.form.get('date');
  }

  OnCalendarSelect(event: Event) {
    console.log(event);
    console.log(event.target);
  }

  OnAdd() {
    if (this.task?.value !== '') {
      const model: TaskDTO = {
        title: this.task?.value,
        status: 'Ongoing',
        date: FixDateFormat(this.date?.value),
      };
      this.taskService.Post(model).subscribe({
        next: (response) => {
          this.form.reset();
          this.toastr.success('Task added successfully', 'Success');
          this.addEvent.emit();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  @HostListener('keydown', ['$event']) KeyboardListen(event: KeyboardEvent) {
    if (event.key === 'enter') {
      this.OnAdd();
    }
  }
}
