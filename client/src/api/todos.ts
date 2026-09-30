import { http } from "./http";

export type Todo = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export function listTodos() {
  return http<Todo[]>("/api/todos");
}

export function createTodo(title: string, description?: string) {
  return http<Todo>("/api/todos", {
    method: "POST",
    body: JSON.stringify({ title, description }),
  });
}

export function updateTodo(
  id: string,
  patch: { title?: string; description?: string }
) {
  return http<Todo>(`/api/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(patch),
  });
}

export function toggleDone(id: string) {
  return http<Todo>(`/api/todos/${id}/done`, { method: "PATCH" });
}

export function deleteTodo(id: string) {
  return http<void>(`/api/todos/${id}`, { method: "DELETE" });
}
