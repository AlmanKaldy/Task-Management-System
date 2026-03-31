/**
 * OOP: Abstraction - Generic Interface
 * Defines standard CRUD operations.
 */
export interface CrudService<T> {
  getAll(): T[];
  getById(id: number): T | undefined;
  create(item: Partial<T>): T;
  delete(id: number): boolean;
}
