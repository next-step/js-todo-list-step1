import { filterBy } from "../store/todoList.js";

export const setRouter = () => window.addEventListener('hashchange', ({ newURL }) => {
  const type = newURL.split('#')[1];
  filterBy(type);
});

export const removeRouter = () =>   window.removeEventListener('hashchange', filterBy);