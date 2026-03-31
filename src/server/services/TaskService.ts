import { Task } from "../models/Task";
import { Category } from "../models/Category";

/**
 * Service Layer: TaskService
 * Demonstrates @PostConstruct simulation and Styled Logging.
 */
class TaskService {
  private tasks: Task[] = [];
  private nextId: number = 1;

  constructor() {
    this.init();
  }

  /**
   * Simulating @PostConstruct with a loading animation
   */
  private async init() {
    process.stdout.write("System Initializing: [");
    for (let i = 0; i <= 20; i++) {
      const dots = "=".repeat(i) + " ".repeat(20 - i);
      process.stdout.write(`\rSystem Initializing: [${dots}] ${i * 5}%`);
      await new Promise(r => setTimeout(r, 50));
    }
    process.stdout.write("\nSystem Ready!\n");

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

    // Styled Log (Dashboard Style)
    console.log("\x1b[32m┌──────────────────────────────────────────┐\x1b[0m");
    console.log(`\x1b[32m│ EVENT: TASK_CREATED                      │\x1b[0m`);
    console.log(`\x1b[32m│ ID:    ${newTask.getId().toString().padEnd(34)} │\x1b[0m`);
    console.log(`\x1b[32m│ TITLE: ${newTask.getTitle().padEnd(34)} │\x1b[0m`);
    console.log("\x1b[32m└──────────────────────────────────────────┘\x1b[0m");

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
      const task = this.tasks[index];
      this.tasks.splice(index, 1);

      // Styled Log (Dashboard Style)
      console.log("\x1b[31m┌──────────────────────────────────────────┐\x1b[0m");
      console.log(`\x1b[31m│ EVENT: TASK_DELETED                      │\x1b[0m`);
      console.log(`\x1b[31m│ ID:    ${task.getId().toString().padEnd(34)} │\x1b[0m`);
      console.log("\x1b[31m└──────────────────────────────────────────┘\x1b[0m");

      return true;
    }
    return false;
  }
}

export const taskService = new TaskService();
