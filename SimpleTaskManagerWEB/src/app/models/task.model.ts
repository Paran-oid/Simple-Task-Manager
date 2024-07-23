export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  important: boolean;
  date?: string;
}

export interface TaskDTO {
  title: string;
  description?: string;
  status: string;
  date?: string;
}
