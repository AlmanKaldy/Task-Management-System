import { Category } from "./Category";

/**
 * Model Layer: Task Entity
 * Demonstrates Encapsulation and Composition (Task has a Category).
 */
export class Task {
  private id: number;
  private title: string;
  private description: string;
  private completed: boolean;
  private category: Category;

  constructor(id: number, title: string, description: string, category: Category) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = false;
    this.category = category;
  }

  // Getters and Setters
  public getId(): number { return this.id; }
  public getTitle(): string { return this.title; }
  public setTitle(title: string): void { this.title = title; }
  public getDescription(): string { return this.description; }
  public setDescription(description: string): void { this.description = description; }
  public isCompleted(): boolean { return this.completed; }
  public setCompleted(completed: boolean): void { this.completed = completed; }
  public getCategory(): Category { return this.category; }
  public setCategory(category: Category): void { this.category = category; }

  // Method to return a clean object for JSON response
  public toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      category: {
        id: this.category.getId(),
        name: this.category.getName()
      }
    };
  }
}
