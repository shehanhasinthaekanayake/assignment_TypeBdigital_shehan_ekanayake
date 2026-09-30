import { changeTodo } from "../domain/todo";
import { TodoRepository } from "../interfaces/todoRepository";

export async function updateTodo(
  repo: TodoRepository,
  id: string,
  patch: { title?: string; description?: string }
) {
  const existing = await repo.findById(id);
  if (!existing) return null;

  return repo.update(changeTodo(existing, patch));
}
