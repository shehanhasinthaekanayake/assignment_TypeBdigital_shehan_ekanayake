import { call, put, takeEvery } from "redux-saga/effects";
import * as api from "../../api/todos";
import type { Todo } from "../../api/todos";
import * as TodoActions from "./actions";

function* listWorker() {
  try {
    const items: Todo[] = yield call(api.listTodos);
    yield put(TodoActions.listOk(items));
  } catch (err) {
    yield put(TodoActions.listFail((err as Error).message));
  }
}

function* createWorker(action: ReturnType<typeof TodoActions.create>) {
  try {
    const todo: Todo = yield call(
      api.createTodo,
      action.title,
      action.description
    );
    yield put(TodoActions.createOk(todo));
  } catch (err) {
    yield put(TodoActions.createFail((err as Error).message));
  }
}

function* updateWorker(action: ReturnType<typeof TodoActions.update>) {
  try {
    const todo: Todo = yield call(api.updateTodo, action.id, action.patch);
    yield put(TodoActions.updateOk(todo));
  } catch (err) {
    yield put(TodoActions.updateFail((err as Error).message));
  }
}

function* toggleWorker(action: ReturnType<typeof TodoActions.toggle>) {
  try {
    const todo: Todo = yield call(api.toggleDone, action.id);
    yield put(TodoActions.toggleOk(todo));
  } catch (err) {
    yield put(TodoActions.toggleFail((err as Error).message));
  }
}

function* deleteWorker(action: ReturnType<typeof TodoActions.remove>) {
  try {
    yield call(api.deleteTodo, action.id);
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
