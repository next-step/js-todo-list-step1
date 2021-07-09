export const get = (key, defaultState) =>
  JSON.parse(localStorage.getItem(key)) || defaultState;
export const set = (key, newState) =>
  localStorage.setItem(key, JSON.stringify(newState));
