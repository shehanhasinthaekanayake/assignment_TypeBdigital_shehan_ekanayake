import { useState, type FormEvent } from "react";
import { parseTodoTitle } from "../../validations/todo";
import { IconButton } from "../atoms/IconButton";
import { TextField } from "../atoms/TextField";

type Props = {
  onAdd: (title: string) => void;
};

export function AddTaskForm({ onAdd }: Props) {
  const [value, setValue] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    const title = parseTodoTitle(value);
    if (!title) return;
    onAdd(title);
    setValue("");
  }

  return (
    <form className="add-form" onSubmit={submit}>
      <div className="add-form-wrap">
        <TextField
          id="task-input"
          value={value}
          placeholder="Write a new task..."
          onChange={setValue}
        />
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
