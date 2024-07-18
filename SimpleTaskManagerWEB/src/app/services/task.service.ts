import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CreateTaskDTO, Task } from '../models/task.model';

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

  Post(model: CreateTaskDTO) {
    return this.http.post<Task>(this.url + 'Task/Post', model);
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
