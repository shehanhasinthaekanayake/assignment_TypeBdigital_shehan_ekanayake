import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddTaskForm } from "../components/molecules/AddTaskForm";
import { DayHeader } from "../components/molecules/DayHeader";
import { EmptyDoneBanner } from "../components/molecules/EmptyDoneBanner";
import { CompletedSection } from "../components/organisms/CompletedSection";
import { TaskSection } from "../components/organisms/TaskSection";
import { AppShell } from "../components/templates/AppShell";
import { create, clearError, list, remove, toggle } from "../store/todos/actions";
import type { RootState } from "../store/store";
import type { Todo } from "../types/todo";

function byCreated(a: Todo, b: Todo) {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

function byUpdated(a: Todo, b: Todo) {
  return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
}

export function TodosPage() {
  const dispatch = useDispatch();
  const { items, listing, creating, pendingId, error } = useSelector(
    (s: RootState) => s.todos
  );
  const [completedOpen, setCompletedOpen] = useState(true);
  const [newActiveIds, setNewActiveIds] = useState<Set<string>>(() => new Set());
  const [newDoneIds, setNewDoneIds] = useState<Set<string>>(() => new Set());
  const prevActive = useRef<Set<string>>(new Set());
  const prevDone = useRef<Set<string>>(new Set());
  const ready = useRef(false);

  const active = useMemo(
    () => items.filter((t) => !t.done).sort(byCreated),
    [items]
  );
  const completed = useMemo(
    () => items.filter((t) => t.done).sort(byUpdated),
    [items]
  );
  const initialLoad = listing && items.length === 0;
  const listFailed = Boolean(error) && items.length === 0 && !listing;

  useEffect(() => {
    dispatch(list());
  }, [dispatch]);

  useEffect(() => {
    const activeIds = new Set(active.map((t) => t.id));
    const doneIds = new Set(completed.map((t) => t.id));

    if (!ready.current) {
      prevActive.current = activeIds;
      prevDone.current = doneIds;
      if (!initialLoad) ready.current = true;
      return;
    }

    const addedActive = [...activeIds].filter((id) => !prevActive.current.has(id));
    const addedDone = [...doneIds].filter((id) => !prevDone.current.has(id));

    if (addedActive.length > 0) {
      setNewActiveIds(new Set(addedActive));
      const t = window.setTimeout(() => setNewActiveIds(new Set()), 500);
      prevActive.current = activeIds;
      prevDone.current = doneIds;
      return () => window.clearTimeout(t);
    }

    if (addedDone.length > 0) {
      setCompletedOpen(true);
      setNewDoneIds(new Set(addedDone));
      const t = window.setTimeout(() => setNewDoneIds(new Set()), 500);
      prevActive.current = activeIds;
      prevDone.current = doneIds;
      return () => window.clearTimeout(t);
    }

    prevActive.current = activeIds;
    prevDone.current = doneIds;
  }, [active, completed, initialLoad]);

  return (
    <AppShell>
      <DayHeader remaining={active.length} />
      <AddTaskForm
        busy={creating}
        onAdd={(title, description) => dispatch(create(title, description))}
      />

      {error ? (
        <div className="status-line status-line--error status-line--row">
          <span>{error}</span>
          <span className="status-actions">
            {listFailed ? (
              <button
                type="button"
                className="status-action"
                onClick={() => dispatch(list())}
              >
                retry
              </button>
            ) : null}
            <button
              type="button"
              className="status-action"
              onClick={() => dispatch(clearError())}
            >
              dismiss
            </button>
          </span>
        </div>
      ) : null}
      {initialLoad ? <p className="status-line">loading…</p> : null}
      {creating ? <p className="status-line">adding…</p> : null}

      {!initialLoad && !listFailed && active.length === 0 ? (
        <EmptyDoneBanner />
      ) : null}

      <div className="lists">
        <TaskSection
          items={active}
          newIds={newActiveIds}
          pendingId={pendingId}
          onToggle={(id) => dispatch(toggle(id))}
          onDelete={(id) => dispatch(remove(id))}
        />

        <CompletedSection
          items={completed}
          open={completedOpen}
          newIds={newDoneIds}
          pendingId={pendingId}
          onToggleOpen={() => setCompletedOpen((o) => !o)}
          onToggle={(id) => dispatch(toggle(id))}
          onDelete={(id) => dispatch(remove(id))}
        />
      </div>
    </AppShell>
  );
}
