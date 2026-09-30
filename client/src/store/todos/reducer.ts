import type { UnknownAction } from "redux";
import type { Todo } from "../../types/todo";
import * as TodoActions from "./actions";

export type TodosState = {
  items: Todo[];
  listing: boolean;
  creating: boolean;
  pendingId: string | null;
  error: string | null;
};

const initial: TodosState = {
  items: [],
  listing: false,
  creating: false,
  pendingId: null,
  error: null,
};

function replace(items: Todo[], todo: Todo) {
  return items.map((t) => (t.id === todo.id ? todo : t));
}

function clearBusy(state: TodosState): TodosState {
  return { ...state, listing: false, creating: false, pendingId: null };
}

export function todosReducer(
  state: TodosState = initial,
  action: UnknownAction
): TodosState {
  switch (action.type) {
    case TodoActions.LIST:
      return { ...state, listing: true, error: null };

    case TodoActions.CREATE:
      return { ...state, creating: true, error: null };

    case TodoActions.UPDATE:
    case TodoActions.TOGGLE:
    case TodoActions.DELETE:
      return {
        ...state,
        pendingId: action.id as string,
        error: null,
      };

    case TodoActions.LIST_OK:
      return {
        ...clearBusy(state),
        items: action.items as Todo[],
      };

    case TodoActions.CREATE_OK:
      return {
        ...clearBusy(state),
        items: [action.todo as Todo, ...state.items],
      };

    case TodoActions.UPDATE_OK:
      return {
        ...clearBusy(state),
        items: replace(state.items, action.todo as Todo),
      };

    case TodoActions.TOGGLE_OK: {
      const todo = action.todo as Todo;
      const rest = state.items.filter((t) => t.id !== todo.id);
      return {
        ...clearBusy(state),
        items: [todo, ...rest],
      };
    }

    case TodoActions.DELETE_OK:
      return {
        ...clearBusy(state),
        items: state.items.filter((t) => t.id !== (action.id as string)),
      };

    case TodoActions.LIST_FAIL:
    case TodoActions.CREATE_FAIL:
    case TodoActions.UPDATE_FAIL:
    case TodoActions.TOGGLE_FAIL:
    case TodoActions.DELETE_FAIL:
      return {
        ...clearBusy(state),
        error: action.error as string,
      };

    default:
      return state;
  }
}
