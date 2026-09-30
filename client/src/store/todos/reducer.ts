import type { UnknownAction } from "redux";
import type { Todo } from "../../types/todo";
import * as TodoActions from "./actions";

export type TodosState = {
  items: Todo[];
  loading: boolean;
  error: string | null;
};

const initial: TodosState = {
  items: [],
  loading: false,
  error: null,
};

function replace(items: Todo[], todo: Todo) {
  return items.map((t) => (t.id === todo.id ? todo : t));
}

export function todosReducer(
  state: TodosState = initial,
  action: UnknownAction
): TodosState {
  switch (action.type) {
    case TodoActions.LIST:
    case TodoActions.CREATE:
    case TodoActions.UPDATE:
    case TodoActions.TOGGLE:
    case TodoActions.DELETE:
      return { ...state, loading: true, error: null };

    case TodoActions.LIST_OK:
      return { ...state, loading: false, items: action.items as Todo[] };

    case TodoActions.CREATE_OK:
      return {
        ...state,
        loading: false,
        items: [action.todo as Todo, ...state.items],
      };

    case TodoActions.UPDATE_OK:
    case TodoActions.TOGGLE_OK:
      return {
        ...state,
        loading: false,
        items: replace(state.items, action.todo as Todo),
      };

    case TodoActions.DELETE_OK:
      return {
        ...state,
        loading: false,
        items: state.items.filter((t) => t.id !== (action.id as string)),
      };

    case TodoActions.LIST_FAIL:
    case TodoActions.CREATE_FAIL:
    case TodoActions.UPDATE_FAIL:
    case TodoActions.TOGGLE_FAIL:
    case TodoActions.DELETE_FAIL:
      return { ...state, loading: false, error: action.error as string };

    default:
      return state;
  }
}
