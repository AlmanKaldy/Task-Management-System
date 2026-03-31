import { Task } from "../models/Task";
import { Category } from "../models/Category";

/**
 * Service Layer: TaskService
 * Handles business logic and data persistence (In-memory ArrayList).
 * Demonstrates Separation of Concerns.
 */
class TaskService {
  private tasks: Task[] = [];
  private nextId: number = 1;

  constructor() {
    // Initial Seed Data
    const workCat = new Category(1, "Work");
    this.addTask("Complete Spring Boot Assignment", "Finish the OOP practice task", workCat);
  }

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: number): Task | undefined {
    return this.tasks.find(t => t.getId() === id);
  }

  public addTask(title: string, description: string, category: Category): Task {
    const newTask = new Task(this.nextId++, title, description, category);
    this.tasks.push(newTask);
    return newTask;
  }

  public updateTask(id: number, title: string, description: string, completed: boolean): Task | null {
    const task = this.getTaskById(id);
    if (task) {
      task.setTitle(title);
      task.setDescription(description);
      task.setCompleted(completed);
      return task;
    }
    return null;
  }

  public deleteTask(id: number): boolean {
    const index = this.tasks.findIndex(t => t.getId() === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      return true;
    }
    return false;
  }
}

export const taskService = new TaskService();
