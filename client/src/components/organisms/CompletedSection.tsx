import { useEffect, useRef } from "react";
import type { Todo } from "../../types/todo";
import { CompletedToggle } from "../molecules/CompletedToggle";
import { TaskRow } from "../molecules/TaskRow";

type Props = {
  items: Todo[];
  open: boolean;
  newIds?: Set<string>;
  pendingId?: string | null;
  onToggleOpen: () => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function CompletedSection({
  items,
  open,
  newIds,
  pendingId,
  onToggleOpen,
  onToggle,
  onDelete,
}: Props) {
  const listRef = useRef<HTMLUListElement>(null);
  const prevFirst = useRef<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const first = items[0]?.id ?? null;
    if (first && first !== prevFirst.current) {
      requestAnimationFrame(() => {
        listRef.current?.scrollTo({ top: 0 });
      });
    }
    prevFirst.current = first;
  }, [items, open]);

  if (items.length === 0) return null;

  return (
    <section className={open ? "list-panel" : "list-panel list-panel--collapsed"}>
      <CompletedToggle
        count={items.length}
        open={open}
        onToggle={onToggleOpen}
      />
      {open ? (
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
      ) : null}
    </section>
  );
}
