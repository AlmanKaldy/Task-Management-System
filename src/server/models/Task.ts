import { BaseEntity } from "./BaseEntity";
import { Category } from "./Category";

/**
 * Model Layer: Task Entity
 * Inherits from BaseEntity.
 */
export class Task extends BaseEntity {
  private title: string;
  private description: string;
  private completed: boolean;
  private category: Category;

  constructor(id: number, title: string, description: string, category: Category) {
    super(id);
    this.title = title;
    this.description = description;
    this.completed = false;
    this.category = category;
  }

  // Getters and Setters
  public getTitle(): string { return this.title; }
  public setTitle(title: string): void { this.title = title; }
  public getDescription(): string { return this.description; }
  public setDescription(description: string): void { this.description = description; }
  public isCompleted(): boolean { return this.completed; }
  public setCompleted(completed: boolean): void { this.completed = completed; }
  public getCategory(): Category { return this.category; }
  public setCategory(category: Category): void { this.category = category; }

  public toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt,
      category: {
        id: this.category.getId(),
        name: this.category.getName()
      }
    };
  }
}
