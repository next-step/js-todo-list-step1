export default (reducers) => {
  const finalReducers = Object.keys(reducers)
    .filter((key) => typeof reducers[key] === 'function')
    .reduce((acc, key) => ({ ...acc, [key]: reducers[key] }), {});

  const finalReducerKeys = Object.keys(finalReducers);
  return (state = {}, action = {}) => {
    let hasChaged = false;

    const nextState = {};

    finalReducerKeys.forEach((key) => {
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[key] = nextStateForKey;
      hasChaged = hasChaged || nextStateForKey !== previousStateForKey;
    });

    const hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length;

    return hasChanged ? nextState : state;
  };
};
