import type { Todo } from "../../api/todos";
import { TodoRow } from "../molecules/TodoRow";

type Props = {
  items: Todo[];
};

export function TodoList({ items }: Props) {
  if (items.length === 0) {
    return <p className="muted">no todos yet</p>;
  }

  return (
    <ul className="todo-list">
      {items.map((t) => (
        <TodoRow key={t.id} todo={t} />
      ))}
    </ul>
  );
}
