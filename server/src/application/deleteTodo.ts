import { TodoRepository } from "../interfaces/todoRepository";

export async function deleteTodo(repo: TodoRepository, id: string) {
  return repo.remove(id);
}
