import { all } from "redux-saga/effects";
import { todosSaga } from "./todos/saga";

export function* rootSaga() {
  yield all([todosSaga()]);
}
