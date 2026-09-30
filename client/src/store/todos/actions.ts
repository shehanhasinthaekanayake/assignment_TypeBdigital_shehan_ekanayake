import type { Todo } from "../../types/todo";

export const LIST = "todos/list";
export const LIST_OK = "todos/listOk";
export const LIST_FAIL = "todos/listFail";

export const CREATE = "todos/create";
export const CREATE_OK = "todos/createOk";
export const CREATE_FAIL = "todos/createFail";

export const UPDATE = "todos/update";
export const UPDATE_OK = "todos/updateOk";
export const UPDATE_FAIL = "todos/updateFail";

export const TOGGLE = "todos/toggle";
export const TOGGLE_OK = "todos/toggleOk";
export const TOGGLE_FAIL = "todos/toggleFail";

export const DELETE = "todos/delete";
export const DELETE_OK = "todos/deleteOk";
export const DELETE_FAIL = "todos/deleteFail";

export const list = () => ({ type: LIST as typeof LIST });
export const listOk = (items: Todo[]) => ({
  type: LIST_OK as typeof LIST_OK,
  items,
});
export const listFail = (error: string) => ({
  type: LIST_FAIL as typeof LIST_FAIL,
  error,
});

export const create = (title: string, description?: string) => ({
  type: CREATE as typeof CREATE,
  title,
  description,
});
export const createOk = (todo: Todo) => ({
  type: CREATE_OK as typeof CREATE_OK,
  todo,
});
export const createFail = (error: string) => ({
  type: CREATE_FAIL as typeof CREATE_FAIL,
  error,
});

export const update = (
  id: string,
  patch: { title?: string; description?: string }
) => ({
  type: UPDATE as typeof UPDATE,
  id,
  patch,
});
export const updateOk = (todo: Todo) => ({
  type: UPDATE_OK as typeof UPDATE_OK,
  todo,
});
export const updateFail = (error: string) => ({
  type: UPDATE_FAIL as typeof UPDATE_FAIL,
  error,
});

export const toggle = (id: string) => ({
  type: TOGGLE as typeof TOGGLE,
  id,
});
export const toggleOk = (todo: Todo) => ({
  type: TOGGLE_OK as typeof TOGGLE_OK,
  todo,
});
export const toggleFail = (error: string) => ({
  type: TOGGLE_FAIL as typeof TOGGLE_FAIL,
  error,
});

export const remove = (id: string) => ({
  type: DELETE as typeof DELETE,
  id,
});
export const removeOk = (id: string) => ({
  type: DELETE_OK as typeof DELETE_OK,
  id,
});
export const removeFail = (error: string) => ({
  type: DELETE_FAIL as typeof DELETE_FAIL,
  error,
});

export type TodosAction =
  | ReturnType<typeof list>
  | ReturnType<typeof listOk>
  | ReturnType<typeof listFail>

  | ReturnType<typeof create>
  | ReturnType<typeof createOk>
  | ReturnType<typeof createFail>

  | ReturnType<typeof update>
  | ReturnType<typeof updateOk>
  | ReturnType<typeof updateFail>

  | ReturnType<typeof toggle>
  | ReturnType<typeof toggleOk>
  | ReturnType<typeof toggleFail>
  
  | ReturnType<typeof remove>
  | ReturnType<typeof removeOk>
  | ReturnType<typeof removeFail>;
