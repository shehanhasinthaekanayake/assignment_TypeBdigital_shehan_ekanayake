import { flipDone } from "../domain/todo";
import { TodoRepository } from "../interfaces/todoRepository";

export async function toggleDone(repo: TodoRepository, id: string) {
  const existing = await repo.findById(id);
  if (!existing) return null;

  return repo.update(flipDone(existing));
}
