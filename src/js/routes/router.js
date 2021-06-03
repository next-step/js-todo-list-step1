import { filterBy } from "../store/todoList.js";

<<<<<<< HEAD
const HASH_CHANGE = 'hashchange'

export const setRouter = () => window.addEventListener(HASH_CHANGE, ({ newURL }) => {
=======
export const setRouter = () => window.addEventListener('hashchange', ({ newURL }) => {
>>>>>>> d6b99b4c9772ac0892fd1faa79029bc450296dc5
  const type = newURL.split('#')[1];
  filterBy(type);
});

<<<<<<< HEAD
export const removeRouter = () =>   window.removeEventListener(HASH_CHANGE, filterBy);
=======
export const removeRouter = () =>   window.removeEventListener('hashchange', filterBy);
>>>>>>> d6b99b4c9772ac0892fd1faa79029bc450296dc5
