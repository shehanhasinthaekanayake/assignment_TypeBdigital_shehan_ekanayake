import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTaskForm } from "../components/molecules/AddTaskForm";
import { DayHeader } from "../components/molecules/DayHeader";
import { EmptyDoneBanner } from "../components/molecules/EmptyDoneBanner";
import { CompletedSection } from "../components/organisms/CompletedSection";
import { TaskSection } from "../components/organisms/TaskSection";
import { AppShell } from "../components/templates/AppShell";
import { create, list, remove, toggle } from "../store/todos/actions";
import type { RootState } from "../store/store";

export function TodosPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((s: RootState) => s.todos);
  const [completedOpen, setCompletedOpen] = useState(true);
  const [newIds, setNewIds] = useState<Set<string>>(() => new Set());
  const prevIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    dispatch(list());
  }, [dispatch]);

  useEffect(() => {
    const current = new Set(items.map((t) => t.id));
    const added = [...current].filter((id) => !prevIds.current.has(id));
    if (added.length > 0 && prevIds.current.size > 0) {
      setNewIds(new Set(added));
      const t = window.setTimeout(() => setNewIds(new Set()), 500);
      prevIds.current = current;
      return () => window.clearTimeout(t);
    }
    prevIds.current = current;
  }, [items]);

  const active = items.filter((t) => !t.done);
  const completed = items.filter((t) => t.done);
  const initialLoad = loading && items.length === 0;

  return (
    <AppShell>
      <DayHeader remaining={active.length} />
      <AddTaskForm onAdd={(title) => dispatch(create(title))} />

      {error ? <p className="status-line status-line--error">{error}</p> : null}
      {initialLoad ? <p className="status-line">loading…</p> : null}

      {!initialLoad && active.length === 0 ? <EmptyDoneBanner /> : null}

      <TaskSection
        items={active}
        newIds={newIds}
        onToggle={(id) => dispatch(toggle(id))}
        onDelete={(id) => dispatch(remove(id))}
      />

      <CompletedSection
        items={completed}
        open={completedOpen}
        onToggleOpen={() => setCompletedOpen((o) => !o)}
        onToggle={(id) => dispatch(toggle(id))}
        onDelete={(id) => dispatch(remove(id))}
      />
    </AppShell>
  );
}
