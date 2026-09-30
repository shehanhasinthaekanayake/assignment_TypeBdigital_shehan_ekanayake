import type { Todo } from "../../api/todos";

type Props = {
  todo: Todo;
};

export function TodoRow({ todo }: Props) {
  return (
    <li className={todo.done ? "todo done" : "todo"}>
      <span className="todo-title">{todo.title}</span>
      {todo.description ? (
        <span className="todo-desc">{todo.description}</span>
      ) : null}
    </li>
  );
}
