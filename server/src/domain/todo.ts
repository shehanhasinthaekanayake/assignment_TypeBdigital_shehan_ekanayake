export type Todo = {
  id: string;
  title: string;
  description: string;
  done: boolean;
};

export function makeTodo(title: string, description = ""): Todo {
  const t = title.trim();
  if (!t) throw new Error("title is required");

  return {
    id: crypto.randomUUID(),
    title: t,
    description: description.trim(),
    done: false,
  };
}

export function changeTodo(
  todo: Todo,
  patch: { title?: string; description?: string }
): Todo {
  const next = { ...todo };

  if (patch.title !== undefined) {
    const t = patch.title.trim();
    if (!t) throw new Error("title is required");
    next.title = t;
  }

  if (patch.description !== undefined) {
    next.description = patch.description.trim();
  }

  return next;
}

export function flipDone(todo: Todo): Todo {
  return { ...todo, done: !todo.done };
}
