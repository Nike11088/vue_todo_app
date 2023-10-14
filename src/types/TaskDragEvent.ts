import { type Task } from '../types/Task'

export interface TaskDragEvent {
  event: DragEvent, 
  task: Task
}