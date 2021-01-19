import { LOCALSTORAGE_NAME } from './utils/constants.js';

export default function todoStorage() {
  const getStorage = () => {
    return JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME));
  };

  const setStorage = (todos) => {
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(todos));
  };

  return {
    getStorage,
    setStorage,
  };
}
