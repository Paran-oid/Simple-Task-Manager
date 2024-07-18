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
import { CreateTaskDTO } from '../../models/task.model';
import { MatInputModule } from '@angular/material/input';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createtask',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
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
    });
  }

  get task() {
    return this.form.get('task');
  }

  OnAdd() {
    if (this.task?.value !== '') {
      const model = new CreateTaskDTO(this.task?.value.toString());
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
