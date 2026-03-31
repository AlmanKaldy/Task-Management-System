import { BaseEntity } from "./BaseEntity";

/**
 * Model Layer: Category Entity
 * Inherits from BaseEntity.
 */
export class Category extends BaseEntity {
  private name: string;

  constructor(id: number, name: string) {
    super(id);
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}
