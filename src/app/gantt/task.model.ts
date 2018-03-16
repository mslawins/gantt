export interface Task {
  id: number;
  name: string;
  start: number;
  end: number;
  span: number;
  depends: number[];
}
