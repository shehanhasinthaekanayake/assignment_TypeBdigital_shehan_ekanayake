import type { Todo } from "../../types/todo";
import { CompletedToggle } from "../molecules/CompletedToggle";
import { TaskRow } from "../molecules/TaskRow";

type Props = {
  items: Todo[];
  open: boolean;
  onToggleOpen: () => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function CompletedSection({
  items,
  open,
  onToggleOpen,
  onToggle,
  onDelete,
}: Props) {
  if (items.length === 0) return null;

  return (
    <section className={open ? "list-panel" : "list-panel list-panel--collapsed"}>
      <CompletedToggle
        count={items.length}
        open={open}
        onToggle={onToggleOpen}
      />
      {open ? (
        <ul className="task-list">
          {items.map((todo) => (
            <TaskRow
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      ) : null}
    </section>
  );
}
