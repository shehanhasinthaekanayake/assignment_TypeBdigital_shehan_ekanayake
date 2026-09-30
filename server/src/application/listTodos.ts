import { TodoRepository } from "../interfaces/todoRepository";

export async function listTodos(repo: TodoRepository) {
  return repo.list();
}
