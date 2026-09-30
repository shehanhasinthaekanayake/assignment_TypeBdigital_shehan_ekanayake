import { Todo } from "../domain/todo";

export interface TodoRepository {
  save(todo: Todo): Promise<Todo>;
  list(): Promise<Todo[]>;
  findById(id: string): Promise<Todo | null>;
  update(todo: Todo): Promise<Todo>;
  remove(id: string): Promise<boolean>;
}
