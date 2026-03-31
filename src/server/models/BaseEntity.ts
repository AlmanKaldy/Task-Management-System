/**
 * OOP: Inheritance - Abstract Base Class
 * Provides common fields for all entities.
 */
export abstract class BaseEntity {
  protected id: number;
  protected createdAt: Date;

  constructor(id: number) {
    this.id = id;
    this.createdAt = new Date();
  }

  public getId(): number {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}
