import { useState, type FormEvent } from "react";
import { parseTodoTitle } from "../../validations/todo";
import { IconButton } from "../atoms/IconButton";
import { TextField } from "../atoms/TextField";

type Props = {
  onAdd: (title: string, description: string) => void;
  busy?: boolean;
};

export function AddTaskForm({ onAdd, busy = false }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hint, setHint] = useState<string | null>(null);

  const hasTitle = title.trim().length > 0;
  const canSubmit = hasTitle && !busy;

  function onTitleChange(value: string) {
    setTitle(value);
    if (value.trim()) {
      setHint(null);
    } else {
      setDescription("");
    }
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;

    const t = parseTodoTitle(title);
    if (!t) {
      setHint("please enter the task");
      return;
    }

    onAdd(t, description.trim());
    setTitle("");
    setDescription("");
    setHint(null);
  }

  return (
    <form
      className={busy ? "add-form add-form--busy" : "add-form"}
      onSubmit={submit}
    >
      <div className="add-form-wrap">
        <div className="add-form-fields">
          <TextField
            id="task-input"
            value={title}
            placeholder={busy ? "Adding…" : "Write a new task..."}
            onChange={onTitleChange}
            disabled={busy}
          />
          <TextField
            id="task-desc"
            value={description}
            placeholder="Description (optional)"
            onChange={setDescription}
            disabled={busy || !hasTitle}
          />
        </div>
        <IconButton
          type="submit"
          icon="add"
          label="Add Task"
          variant="primary"
          disabled={!canSubmit}
        />
      </div>
      {hint ? <p className="add-form-hint">{hint}</p> : null}
    </form>
  );
}
