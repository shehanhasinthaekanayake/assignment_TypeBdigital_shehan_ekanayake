import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";
import { todosReducer } from "./todos/reducer";

const rootReducer = combineReducers({
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
