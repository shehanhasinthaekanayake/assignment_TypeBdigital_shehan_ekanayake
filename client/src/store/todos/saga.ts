import { call, put, takeEvery } from "redux-saga/effects";
import type { Todo } from "../../types/todo";
import * as TodoActions from "./actions";

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });

  if (!res.ok) {
    let msg = res.statusText;
    try {
      const body = (await res.json()) as { error?: string };
      if (body.error) msg = body.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

function* listWorker() {
  try {
    const items: Todo[] = yield call(req, "/api/todos");
    yield put(TodoActions.listOk(items));
  } catch (err) {
    yield put(TodoActions.listFail((err as Error).message));
  }
}

function* createWorker(action: ReturnType<typeof TodoActions.create>) {
  try {
    const todo: Todo = yield call(req, "/api/todos", {
      method: "POST",
      body: JSON.stringify({
        title: action.title,
        description: action.description,
      }),
    });
    yield put(TodoActions.createOk(todo));
  } catch (err) {
    yield put(TodoActions.createFail((err as Error).message));
  }
}

function* updateWorker(action: ReturnType<typeof TodoActions.update>) {
  try {
    const todo: Todo = yield call(req, `/api/todos/${action.id}`, {
      method: "PUT",
      body: JSON.stringify(action.patch),
    });
    yield put(TodoActions.updateOk(todo));
  } catch (err) {
    yield put(TodoActions.updateFail((err as Error).message));
  }
}

function* toggleWorker(action: ReturnType<typeof TodoActions.toggle>) {
  try {
    const todo: Todo = yield call(req, `/api/todos/${action.id}/done`, {
      method: "PATCH",
    });
    yield put(TodoActions.toggleOk(todo));
  } catch (err) {
    yield put(TodoActions.toggleFail((err as Error).message));
  }
}

function* deleteWorker(action: ReturnType<typeof TodoActions.remove>) {
  try {
    yield call(req, `/api/todos/${action.id}`, { method: "DELETE" });
    yield put(TodoActions.removeOk(action.id));
  } catch (err) {
    yield put(TodoActions.removeFail((err as Error).message));
  }
}

export function* todosSaga() {
  yield takeEvery(TodoActions.LIST, listWorker);
  yield takeEvery(TodoActions.CREATE, createWorker);
  yield takeEvery(TodoActions.UPDATE, updateWorker);
  yield takeEvery(TodoActions.TOGGLE, toggleWorker);
  yield takeEvery(TodoActions.DELETE, deleteWorker);
}
