function createStore( reducer ) {
  
  let state;

  const listeners = [];

  const publish = () => {
    listeners.forEach(({ subscriber })=> {
      subscriber();
    });
  }

  const dispatch = action => {
    state = reducer(state, action);
    publish();
  }

  const subscribe = subscriber => {
    listeners.push({
      subscriber
    });
  };

  const getState = () => ({ ...state});

  return { dispatch, getState, subscribe };
};

export default createStore;