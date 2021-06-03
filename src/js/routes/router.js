import { filterBy } from "../store/todoList.js";

const HASH_CHANGE = 'hashchange'

export const setRouter = () => window.addEventListener(HASH_CHANGE, ({ newURL }) => {
  const type = newURL.split('#')[1];
  filterBy(type);
});

export const removeRouter = () =>   window.removeEventListener(HASH_CHANGE, filterBy);