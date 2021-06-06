let store;
import { initialState } from '../modules/todos/index.js';

export const createStore = (reducer, middlewares = []) => {
  let state = initialState;
  let handler = [];

  const dispatch = (action) => {
    state = reducer(state, action);
    handler.forEach((listener) => {
      listener();
    });
  };

  const getState = () => {
    return state;
  };

  const subscribe = (listener) => {
    handler.push(listener);

    return () => {
      handler = handler.filter((l) => l !== listener);
    };
  };

  store = {
    getState,
    subscribe,
  };

  middlewares = Array.from(middlewares).reverse();

  let lastDispatch = dispatch;

  middlewares.forEach((middleware) => {
    lastDispatch = middleware(store)(lastDispatch);
  });

  return {
    ...store,
    dispatch: lastDispatch,
  };
};

export const useSelector = (fn) => {
  if (typeof fn !== 'function') return store.getState();
  return fn(store.getState());
};
