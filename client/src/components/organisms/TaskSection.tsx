import { useEffect, useRef } from "react";
import type { Todo } from "../../types/todo";
import { TaskRow } from "../molecules/TaskRow";

type Props = {
  items: Todo[];
  newIds?: Set<string>;
  pendingId?: string | null;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskSection({
  items,
  newIds,
  pendingId,
  onToggle,
  onDelete,
}: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const prevFirst = useRef<string | null>(null);

  useEffect(() => {
    const first = items[0]?.id ?? null;
    if (first && first !== prevFirst.current) {
      requestAnimationFrame(() => {
        listRef.current?.scrollTo({ top: 0 });
      });
    }
    prevFirst.current = first;
  }, [items]);

  if (items.length === 0) return null;

  return (
    <section className="list-panel">
      <p className="section-label">To Do</p>
      <ul className="task-list" ref={listRef}>
        {items.map((todo) => (
          <TaskRow
            key={todo.id}
            todo={todo}
            isNew={newIds?.has(todo.id)}
            busy={pendingId === todo.id}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}
