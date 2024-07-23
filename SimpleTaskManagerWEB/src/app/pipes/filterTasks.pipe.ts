import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../models/task.model';

@Pipe({
  name: 'taskFilter',
  standalone: true,
})
export class TaskFilter implements PipeTransform {
  transform(tasks: Task[], filter: string) {
    if (tasks.length === 0 || filter === '') return tasks;

    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const day = new Date().getDate().toString().padStart(2, '0');
    const date = year + '-' + month + '-' + day;

    console.log('current date ' + date);

    switch (filter) {
      case 'Important':
        return tasks.filter((t) => t.important === true);
      case 'Completed':
        return tasks.filter((t) => t.status === 'Completed');
      case 'Today':
        tasks.forEach((t) => console.log('task ' + t.id + ' date ' + t.date));
        const currTasks = tasks.filter((t) => t.date === date);
        return tasks.filter((t) => t.date === date);
      case 'Scheduled':
        return tasks.filter((l) => l.date !== date);
      default:
        return tasks;
    }
  }
}
