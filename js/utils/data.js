import { CLASS_NAME } from '../utils/constant.js';

const initialState = {
  todos: [],
  selectedTab: CLASS_NAME.ALL,
};

export const fetchState = (key) => {
  try {
    const state = localStorage.getItem(key);
    return state ? JSON.parse(state) : initialState;
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
