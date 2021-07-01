export default (reducers) => {
  const finalReducers = Object.keys(reducers)
    .filter((key) => typeof reducers[key] === 'function')
    .reduce((acc, key) => ({ ...acc, [key]: reducers[key] }));
};
