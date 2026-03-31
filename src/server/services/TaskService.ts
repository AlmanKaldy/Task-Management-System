import { Task } from "../models/Task";
import { Category } from "../models/Category";
import { CrudService } from "./CrudService";

/**
 * Service Layer: TaskService
 * Implements CrudService<Task> interface.
 */
class TaskService implements CrudService<Task> {
  private tasks: Task[] = [];
  private nextId: number = 1;

  constructor() {
    this.init();
  }

  private async init() {
    // Custom Success Header (Digital Identity)
    console.log("\x1b[36m");
    console.log("  ___   _      ___  ___  ___  _  _  ___  ___  _____ ");
    console.log(" / _ \\ | |    |  \\/  | / _ \\| \\| || _ \\| __||_   _|");
    console.log("/ /_\\ \\| |__  | .  . |/ /_\\ \\ .  || _ <| _|   | |  ");
    console.log("\\_/ \\_/\\____/ \\_|  |_/\\_/ \\_/\\_|\\_||___/|___|  |_|  ");
    console.log("\x1b[0m");
    console.log("\x1b[33m[SYSTEM STATUS: ONLINE]\x1b[0m");

    process.stdout.write("System Initializing: [");
    for (let i = 0; i <= 20; i++) {
      const dots = "=".repeat(i) + " ".repeat(20 - i);
      process.stdout.write(`\rSystem Initializing: [${dots}] ${i * 5}%`);
      await new Promise(r => setTimeout(r, 50));
    }
    process.stdout.write("\nSystem Ready!\n");

    // Initial Seed Data
    const workCat = new Category(1, "Work");
    this.create({ title: "Complete Spring Boot Assignment", description: "Finish the OOP practice task", category: workCat } as any);
  }

  public getAll(): Task[] {
    return this.tasks;
  }

  public getById(id: number): Task | undefined {
    return this.tasks.find(t => t.getId() === id);
  }

  public create(item: any): Task {
    const newTask = new Task(this.nextId++, item.title, item.description, item.category);
    this.tasks.push(newTask);

    console.log("\x1b[32m┌──────────────────────────────────────────┐\x1b[0m");
    console.log(`\x1b[32m│ EVENT: TASK_CREATED                      │\x1b[0m`);
    console.log(`\x1b[32m│ ID:    ${newTask.getId().toString().padEnd(34)} │\x1b[0m`);
    console.log(`\x1b[32m│ TITLE: ${newTask.getTitle().padEnd(34)} │\x1b[0m`);
    console.log("\x1b[32m└──────────────────────────────────────────┘\x1b[0m");

    return newTask;
  }

  public update(id: number, title: string, description: string, completed: boolean): Task | null {
    const task = this.getById(id);
    if (task) {
      task.setTitle(title);
      task.setDescription(description);
      task.setCompleted(completed);
      return task;
    }
    return null;
  }

  public delete(id: number): boolean {
    const index = this.tasks.findIndex(t => t.getId() === id);
    if (index !== -1) {
      const task = this.tasks[index];
      this.tasks.splice(index, 1);

      console.log("\x1b[31m┌──────────────────────────────────────────┐\x1b[0m");
      console.log(`\x1b[31m│ EVENT: TASK_DELETED                      │\x1b[0m`);
      console.log(`\x1b[31m│ ID:    ${task.getId().toString().padEnd(34)} │\x1b[0m`);
      console.log("\x1b[31m└──────────────────────────────────────────┘\x1b[0m");

      return true;
    }
    return false;
  }

  // Compatibility methods for existing controller
  public getAllTasks() { return this.getAll(); }
  public getTaskById(id: number) { return this.getById(id); }
  public addTask(title: string, description: string, category: Category) { 
    return this.create({ title, description, category }); 
  }
  public updateTask(id: number, title: string, description: string, completed: boolean) {
    return this.update(id, title, description, completed);
  }
  public deleteTask(id: number) { return this.delete(id); }
}

export const taskService = new TaskService();
