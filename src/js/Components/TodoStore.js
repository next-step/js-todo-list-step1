import { LOCAL_STORAGE_KEY } from '../enum.js';

const store = window.localStorage;

const todoStore = {
  getStore() {
    return JSON.parse(store.getItem(LOCAL_STORAGE_KEY));
  },
  setStore(todoItems) {
    store.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoItems));
  },
};

export default todoStore;
