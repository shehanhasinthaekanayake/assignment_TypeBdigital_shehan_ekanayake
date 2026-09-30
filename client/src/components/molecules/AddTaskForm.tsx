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

  function submit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    const t = parseTodoTitle(title);
    if (!t) return;
    onAdd(t, description.trim());
    setTitle("");
    setDescription("");
  }

  return (
    <form className={busy ? "add-form add-form--busy" : "add-form"} onSubmit={submit}>
      <div className="add-form-wrap">
        <div className="add-form-fields">
          <TextField
            id="task-input"
            value={title}
            placeholder={busy ? "Adding…" : "Write a new task..."}
            onChange={setTitle}
            disabled={busy}
          />
          <TextField
            id="task-desc"
            value={description}
            placeholder="Description (optional)"
            onChange={setDescription}
            disabled={busy}
          />
        </div>
        <IconButton
          type="submit"
          icon="add"
          label="Add Task"
          variant="primary"
          disabled={busy}
        />
      </div>
    </form>
  );
}
