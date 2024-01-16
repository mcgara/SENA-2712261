import { ModelsConnection } from './models.js';

export interface Task {
  id: number,
  title: string
  description: string
  state: string
}

export function TaskFindById(connection: ModelsConnection, id: number): Promise<Task | null>

export function TaskModel(): {
  findById: (id: number) => ReturnType<typeof TaskFindById>
}

export default TaskModel
