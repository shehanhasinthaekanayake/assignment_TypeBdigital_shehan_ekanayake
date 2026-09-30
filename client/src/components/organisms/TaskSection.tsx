import type { Todo } from "../../api/todos";
import { TaskRow } from "../molecules/TaskRow";

type Props = {
  items: Todo[];
  newIds?: Set<string>;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskSection({ items, newIds, onToggle, onDelete }: Props) {
  if (items.length === 0) return null;

  return (
    <section>
      <p className="section-label">To Do</p>
      <ul className="task-list">
        {items.map((todo) => (
          <TaskRow
            key={todo.id}
            todo={todo}
            isNew={newIds?.has(todo.id)}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
