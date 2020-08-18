import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore() {
  const middlewares = [
    thunkMiddleware
  ];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, composeWithDevTools()];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, composedEnhancers, );

  return store;
}
