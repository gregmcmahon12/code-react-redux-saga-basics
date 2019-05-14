import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import "babel-polyfill";
import createSagaMiddleware from "redux-saga";
import Counter from "./Counter";
import CounterPlus from "./CounterPlus";
import CounterSaga from "./CounterSaga";
import CounterMapDispatchFn from "./CounterMapDispatchFn";
import CounterMapDispatchObj from "./CounterMapDispatchObj";
import { put, takeEvery, all } from "redux-saga/effects";

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* helloSaga() {
  console.log("Hello Sagas!");
}
export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: "INC" });
}
export function* watchIncrementAsync() {
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}

// The reducer updates the count
const initialState = {
  count: 0
};
function reducer(state = initialState, action) {
  switch (action.type) {
    case "INC":
      return { ...state, count: state.count + 1 };
    case "DEC":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    default:
      return state;
  }
}

// The store holds the data
const action = type => store.dispatch({ type });
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

// The App renders everything
function App() {
  return (
    <div className="App">
      <Counter />
      <CounterPlus />
      <CounterMapDispatchFn />
      <CounterMapDispatchObj />
      <CounterSaga
        onIncrement={() => action("INC")}
        onDecrement={() => action("DEC")}
        onIncrementAsync={() => action("INCREMENT_ASYNC")}
      />
    </div>
  );
}

// The Provider passes the store through the app
// so connect() can access it
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
