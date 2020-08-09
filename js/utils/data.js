import { CLASS_NAME } from '../utils/constant.js';

export const fetchState = (key) => {
  try {
    const defaultState = {
      todos: [],
      selectedTab: CLASS_NAME.ALL,
    };

    const state = localStorage.getItem(key);
    return state ? JSON.parse(state) : defaultState;
  } catch (err) {
    console.error(err);
  }
};

export const saveState = (key, state) => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (err) {
    console.error(err);
  }
};
