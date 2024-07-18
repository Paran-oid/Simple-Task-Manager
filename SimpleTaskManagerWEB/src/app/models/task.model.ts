export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
}

export interface TaskDTO {
  title: string;
  description?: string;
  status: string;
}

export class CreateTaskDTO {
  status: string;
  constructor(public title: string) {
    this.status = 'Ongoing';
  }
}
