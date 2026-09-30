import { useState, type FormEvent } from "react";
import { parseTodoTitle } from "../../validations/todo";
import { IconButton } from "../atoms/IconButton";
import { TextField } from "../atoms/TextField";

type Props = {
  onAdd: (title: string, description: string) => void;
};

export function AddTaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const t = parseTodoTitle(title);
    if (!t) return;
    onAdd(t, description.trim());
    setTitle("");
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={submit}>
      <div className="add-form-wrap">
        <div className="add-form-fields">
          <TextField
            id="task-input"
            value={title}
            placeholder="Write a new task..."
            onChange={setTitle}
          />
          <TextField
            id="task-desc"
            value={description}
            placeholder="Description (optional)"
            onChange={setDescription}
          />
        </div>
        <IconButton
          type="submit"
          icon="add"
          label="Add Task"
          variant="primary"
        />
      </div>
    </form>
  );
}
