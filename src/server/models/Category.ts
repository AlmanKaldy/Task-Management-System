/**
 * Model Layer: Category Entity
 * Demonstrates Encapsulation with private fields and accessors.
 */
export class Category {
  private id: number;
  private name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  // Getters and Setters (Encapsulation)
  public getId(): number {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}
