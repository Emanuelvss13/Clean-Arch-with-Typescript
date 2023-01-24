export interface IRepositoryInterface<T> {
  create(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
  find(id: string): Promise<T | void>;
  findAll(): Promise<T[]>;
}
