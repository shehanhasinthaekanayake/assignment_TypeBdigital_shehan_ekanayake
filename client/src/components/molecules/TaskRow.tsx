import type { Todo } from "../../types/todo";
import { CheckButton } from "../atoms/CheckButton";
import { IconButton } from "../atoms/IconButton";

type Props = {
  todo: Todo;
  isNew?: boolean;
  busy?: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskRow({
  todo,
  isNew = false,
  busy = false,
  onToggle,
  onDelete,
}: Props) {
  const done = todo.done;

  return (
    <li
      className={[
        "task-row",
        done ? "task-row--done" : "",
        isNew ? "task-row--new" : "",
        busy ? "task-row--busy" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="task-row-main">
        <CheckButton
          done={done}
          label={done ? "Mark active" : "Mark task done"}
          onClick={() => onToggle(todo.id)}
          disabled={busy}
        />
        <div
          className="task-text"
          onClick={() => {
            if (!busy) onToggle(todo.id);
          }}
          role="button"
          tabIndex={busy ? -1 : 0}
          onKeyDown={(e) => {
            if (busy) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle(todo.id);
            }
          }}
        >
          <span className={done ? "task-label task-label--done" : "task-label"}>
            {todo.title}
          </span>
          {todo.description ? (
            <span
              className={done ? "task-desc task-desc--done" : "task-desc"}
            >
              {todo.description}
            </span>
          ) : null}
        </div>
      </div>
      <IconButton
        icon="delete"
        label={done ? "Delete completed task" : "Delete task"}
        variant="danger"
        className="icon-btn--ghost"
        onClick={() => onDelete(todo.id)}
        disabled={busy}
      />
    </li>
  );
}
