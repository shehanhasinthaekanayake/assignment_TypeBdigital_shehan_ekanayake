import { makeTodo } from "../domain/todo";
import { TodoRepository } from "../interfaces/todoRepository";

export async function createTodo(
  repo: TodoRepository,
  title: string,
  description?: string
) {
  return repo.save(makeTodo(title, description));
}
