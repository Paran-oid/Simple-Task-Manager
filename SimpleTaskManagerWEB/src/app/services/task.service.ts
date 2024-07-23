import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Task, TaskDTO } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url = environment.BaseUrl;
  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get<Task[]>(this.url + 'Task/GetAll');
  }

  Get(ID: number) {
    return this.http.get<Task>(this.url + 'Task/Get/' + ID);
  }

  Post(model: TaskDTO) {
    return this.http.post<Task>(this.url + 'Task/Post', model);
  }

  Put(ID: number, model: TaskDTO) {
    return this.http.put<Task>(this.url + 'Task/Put/' + ID, model);
  }

  ToggleTaskImportance(ID: number) {
    return this.http.get(this.url + 'Task/TaskImportanceToggle/' + ID);
  }

  ToggleTask(ID: number, status: string) {
    const httpOptions = { headers: { 'Content-Type': 'application/json' } };
    return this.http.put(
      this.url + 'Task/ToggleTask/' + ID,
      JSON.stringify(status),
      httpOptions
    );
  }

  Delete(ID: number) {
    return this.http.delete(this.url + 'Task/Delete/' + ID, {
      responseType: 'text',
    });
  }
}
