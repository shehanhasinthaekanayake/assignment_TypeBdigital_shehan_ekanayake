import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoList } from "../components/organisms/TodoList";
import { AppShell } from "../components/templates/AppShell";
import { list } from "../store/todos/actions";
import type { RootState } from "../store/store";

export function TodosPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (s: RootState) => s.todos
  );

  useEffect(() => {
    dispatch(list());
  }, [dispatch]);

  return (
    <AppShell title="todos">
      {loading && items.length === 0 ? (
        <p className="muted">loading…</p>
      ) : null}
      {error ? <p className="error">{error}</p> : null}
      <TodoList items={items} />
    </AppShell>
  );
}
