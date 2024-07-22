import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskFilter',
  standalone: true,
})
export class TaskFilter implements PipeTransform {
  transform(tasks: Task[], filter: string) {
    if (tasks.length === 0 || filter === '') return tasks;

    switch (filter) {
      case 'Important':
        return tasks.filter((t) => t.important === true);
      case 'Completed':
        return tasks.filter((t) => t.status === 'Completed');
      default:
        return tasks;
    }
  }
}
