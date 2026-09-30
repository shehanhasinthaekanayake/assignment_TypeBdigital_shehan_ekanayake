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
    <section>
      <CompletedToggle
        count={items.length}
        open={open}
        onToggle={onToggleOpen}
      />
      <div className={open ? "accordion" : "accordion accordion--closed"}>
        <div className="accordion-inner">
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
        </div>
      </div>
    </section>
  );
}
