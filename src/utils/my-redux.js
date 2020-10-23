export function createStore(reducer) {
  let state;

  const listeners = [];

  const publish = type => {
    listeners.forEach(({ subscriber }) => {
      subscriber(type);
    });
  };

  const dispatch = action => {
    state = reducer(state, action);

    publish(action.type);
  };

  const subscribe = subscriber => {
    listeners.push({
      subscriber
    });
  };

  const getState = () => ({ ...state });

  return {
    dispatch,
    getState,
    subscribe
  };
}
