export interface Task {
  name: string;
  subtasks: Subtask[];
}

export interface Subtask {
  id: number;
  name: string;
  start: number;
  end: number;
  span: number;
  depends: number[];
}
